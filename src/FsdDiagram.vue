<script setup lang="ts">
import { ref, computed } from "vue";
import type { DiagramModel, ExportFormat } from "flowchart-sequence-designer";
import type { DiagramEditorProps, ThemeColors } from "flowchart-sequence-designer/ui";
import { useReactBridge } from "./useReactBridge";

const props = withDefaults(
  defineProps<{
    modelValue?: DiagramModel;
    height?: string | number;
    variant?: DiagramEditorProps["variant"];
    theme?: "light" | "dark" | "auto";
    themeOverrides?: Partial<ThemeColors>;
    allowImport?: boolean;
    allowedExports?: ExportFormat[];
  }>(),
  {
    height: "500px",
    theme: "auto",
  },
);

const emit = defineEmits<{
  "update:modelValue": [model: DiagramModel];
  export: [payload: { format: ExportFormat; content: string | Blob }];
}>();

const containerRef = ref<HTMLElement | null>(null);

const normalizedHeight = computed(() => {
  if (typeof props.height === "number") return `${props.height}px`;
  if (typeof props.height === "string") {
    if (/^\d+$/.test(props.height)) return `${props.height}px`;
    return props.height;
  }
  return "500px";
});

const getProps = () =>
  ({
    initialModel: props.modelValue,
    onChange: (model: DiagramModel) => emit("update:modelValue", model),
    onExport: (format: ExportFormat, content: string | Blob) =>
      emit("export", { format, content }),
    height: "100%",
    allowedExports: props.allowedExports,
    allowImport: props.allowImport,
    variant: props.variant,
    theme: props.theme,
    themeOverrides: props.themeOverrides,
  }) as DiagramEditorProps;

const { loading, error } = useReactBridge<DiagramEditorProps>(
  containerRef,
  getProps,
  () => import("flowchart-sequence-designer/ui").then((m) => m.DiagramEditor),
);
</script>

<template>
  <span v-if="loading" :style="{ color: '#888', fontSize: '14px', padding: '16px', display: 'inline-block' }">Loading editor…</span>
  <span v-if="error" :style="{ color: '#c00', fontSize: '14px', padding: '16px', display: 'inline-block' }">{{ error }}</span>
  <div
    ref="containerRef"
    :style="{ height: normalizedHeight, width: '100%', display: loading || error ? 'none' : 'block' }"
  />
</template>
