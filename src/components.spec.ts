import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";

// Mock the dynamic imports
vi.mock("flowchart-sequence-designer/ui", () => ({
  DiagramEditor: () => null,
  SequenceEditor: () => null,
  Toolbar: () => null,
  StepEditor: () => null,
}));

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
    unmount: vi.fn(),
  })),
}));

vi.mock("react", () => ({
  createElement: vi.fn(),
}));

describe("FsdDiagram", () => {
  it("should render loading text initially", async () => {
    const { default: FsdDiagram } = await import("./FsdDiagram.vue");
    const wrapper = mount(FsdDiagram, {
      props: { height: 600 },
    });
    expect(wrapper.text()).toContain("Loading editor");
  });

  it("should apply height style to container div", async () => {
    const { default: FsdDiagram } = await import("./FsdDiagram.vue");
    const wrapper = mount(FsdDiagram, {
      props: { height: 600 },
    });
    const container = wrapper.find("div");
    expect(container.attributes("style")).toContain("600px");
  });

  it("should normalize string pixel heights", async () => {
    const { default: FsdDiagram } = await import("./FsdDiagram.vue");
    const wrapper = mount(FsdDiagram, {
      props: { height: "800" },
    });
    const container = wrapper.find("div");
    expect(container.attributes("style")).toContain("800px");
  });

  it("should pass through CSS values like calc()", async () => {
    const { default: FsdDiagram } = await import("./FsdDiagram.vue");
    const wrapper = mount(FsdDiagram, {
      props: { height: "calc(100vh - 52px)" },
    });
    const container = wrapper.find("div");
    expect(container.attributes("style")).toContain("calc(100vh - 52px)");
  });
});

describe("FsdSequence", () => {
  it("should render loading text initially", async () => {
    const { default: FsdSequence } = await import("./FsdSequence.vue");
    const wrapper = mount(FsdSequence, {
      props: { height: "400px" },
    });
    expect(wrapper.text()).toContain("Loading editor");
  });
});

describe("FsdToolbar", () => {
  it("should render loading text", async () => {
    const { default: FsdToolbar } = await import("./FsdToolbar.vue");
    const wrapper = mount(FsdToolbar);
    expect(wrapper.text()).toContain("Loading toolbar");
  });
});

describe("FsdStepEditor", () => {
  it("should render with required props", async () => {
    const { default: FsdStepEditor } = await import("./FsdStepEditor.vue");
    const wrapper = mount(FsdStepEditor, {
      props: {
        nodeId: "node-1",
        model: { nodes: [], edges: [] } as any,
      },
    });
    expect(wrapper.text()).toContain("Loading editor");
  });
});
