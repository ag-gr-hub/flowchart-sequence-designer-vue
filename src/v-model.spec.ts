import { describe, it, expect, vi, afterEach } from "vitest";
import { defineComponent, h, nextTick, reactive, ref, type Ref } from "vue";
import { mount, flushPromises, enableAutoUnmount } from "@vue/test-utils";
import type { DiagramModel } from "flowchart-sequence-designer";
import FsdDiagram from "./FsdDiagram.vue";
import FsdSequence from "./FsdSequence.vue";

// Real React and the real core editor: this behaviour depends on how the core
// treats `initialModel`, which a mock would only assert back at us.

const flowchart = (label: string): DiagramModel => ({
  type: "flowchart",
  variant: "flowchart",
  nodes: [{ id: "n1", type: "process", label, x: 100, y: 100 }],
  edges: [],
} as DiagramModel);

const sequence = (actor: string): DiagramModel => ({
  type: "sequence",
  nodes: [],
  edges: [],
  actors: [actor, "Other"],
  messages: [],
} as DiagramModel);

/** Mounts `component` with v-model bound to `model`, the way a parent would. */
function mountBound(component: typeof FsdDiagram | typeof FsdSequence, model: Ref<DiagramModel | undefined>) {
  return mount(
    defineComponent({
      setup: () => () =>
        h(component, {
          modelValue: model.value,
          "onUpdate:modelValue": (m: DiagramModel) => (model.value = m),
        }),
    }),
    { attachTo: document.body },
  );
}

enableAutoUnmount(afterEach);

/** Waits for the lazy editor import and for React to commit `text`. */
async function shows(text: string) {
  await vi.waitFor(async () => {
    await flushPromises();
    await nextTick();
    expect(document.body.textContent).toContain(text);
  }, { timeout: 2000 });
}

describe("v-model with the real editor", () => {
  it("FsdDiagram shows a model the parent replaces after mount", async () => {
    const model = ref<DiagramModel | undefined>(flowchart("First"));
    mountBound(FsdDiagram, model);
    await shows("First");

    model.value = flowchart("Second");
    await shows("Second");
    expect(document.body.textContent).not.toContain("First");
  });

  it("FsdSequence shows a model the parent replaces after mount", async () => {
    const model = ref<DiagramModel | undefined>(sequence("Alice"));
    mountBound(FsdSequence, model);
    await shows("Alice");

    model.value = sequence("Bob");
    await shows("Bob");
    expect(document.body.textContent).not.toContain("Alice");
  });

  it("picks up in-place mutation of a reactive model", async () => {
    const state = reactive({ model: flowchart("Before") });
    mount(
      defineComponent({ setup: () => () => h(FsdDiagram, { modelValue: state.model }) }),
      { attachTo: document.body },
    );
    await shows("Before");

    state.model.nodes[0].label = "After";
    await shows("After");
  });
});

describe("a real edit in the real editor", () => {
  it("reaches the parent without remounting the editor", async () => {
    const model = ref<DiagramModel | undefined>(sequence("Alice"));
    mountBound(FsdSequence, model);
    await shows("Alice");
    const editor = document.querySelector(".fsd-seq-editor");
    const addActor = [...document.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("+ Actor"),
    );

    addActor!.click();
    await vi.waitFor(() => expect(model.value!.actors!.length).toBe(3));
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(editor?.isConnected).toBe(true);
    expect(document.querySelector(".fsd-seq-editor")).toBe(editor);
  });
});

describe("a real edit in the real flowchart editor", () => {
  it("reaches the parent without remounting the editor", async () => {
    const model = ref<DiagramModel | undefined>(flowchart("Start"));
    mountBound(FsdDiagram, model);
    await shows("Start");
    const editor = document.querySelector(".fsd-editor");
    const add = [...document.querySelectorAll("button")].find((b) =>
      b.textContent?.startsWith("+ "),
    );

    add!.click();
    await vi.waitFor(() => expect(model.value!.nodes.length).toBe(2));
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(document.querySelector(".fsd-editor")).toBe(editor);
  });
});

describe("v-model edit echoes", () => {
  // A stand-in for the core: like it, it reads initialModel once, on mount.
  const mounts = { count: 0, edit: (_m: unknown) => {} };

  async function mountFake(store: (m: DiagramModel) => DiagramModel) {
    const { createElement, useEffect } = await import("react");
    const Editor = ({ onChange }: { onChange: (m: unknown) => void }) => {
      useEffect(() => {
        mounts.count++;
      }, []);
      mounts.edit = onChange;
      return createElement("p", null, "fake");
    };
    const { useReactBridge } = await import("./useReactBridge");
    const { useModelSync } = await import("./useModelSync");

    const model = ref<DiagramModel>(flowchart("Start"));
    const Host = defineComponent({
      props: { modelValue: { type: Object, required: true } },
      emits: ["update:modelValue"],
      setup(props, { emit }) {
        const el = ref<HTMLElement | null>(null);
        const { revision, noteEdit } = useModelSync(() => props.modelValue as DiagramModel);
        useReactBridge(
          el,
          () => ({
            key: revision.value,
            onChange: (m: unknown) => {
              noteEdit(m as DiagramModel);
              emit("update:modelValue", m);
            },
          }),
          async () => Editor,
        );
        return () => h("div", { ref: el });
      },
    });
    mount(
      defineComponent({
        setup: () => () =>
          h(Host, {
            modelValue: model.value,
            "onUpdate:modelValue": (m: DiagramModel) => (model.value = store(m)),
          }),
      }),
      { attachTo: document.body },
    );
    await shows("fake");
    return model;
  }

  async function settled() {
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 20));
  }

  it("does not remount the editor for its own edit", async () => {
    mounts.count = 0;
    await mountFake((m) => m);
    mounts.edit(flowchart("Edited"));
    await settled();
    expect(mounts.count).toBe(1);
  });

  it("does not remount when the parent stores a clone of the edit", async () => {
    mounts.count = 0;
    await mountFake((m) => structuredClone(m));
    mounts.edit(flowchart("Edited"));
    await settled();
    expect(mounts.count).toBe(1);
  });

  it("remounts when the parent overrides the edit", async () => {
    mounts.count = 0;
    const model = await mountFake((m) => m);
    mounts.edit(flowchart("Edited"));
    await settled();
    model.value = flowchart("Reset");
    await settled();
    expect(mounts.count).toBe(2);
  });
});
