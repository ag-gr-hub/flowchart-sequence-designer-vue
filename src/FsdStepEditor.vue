<script setup lang="ts">
import { ref } from "vue";
import type { DiagramModel } from "flowchart-sequence-designer";
import type { DiagramEditorProps, ThemeColors } from "flowchart-sequence-designer/ui";
import { useReactBridge } from "./useReactBridge";

interface StepEditorBridgeProps {
  nodeId: string;
  model: DiagramModel;
  onModelChange: (model: DiagramModel) => void;
  variant?: string;
  isDark?: boolean;
  t?: ThemeColors;
}

const props = defineProps<{
  nodeId: string;
  model: DiagramModel;
  variant?: DiagramEditorProps["variant"];
  isDark?: boolean;
  themeColors?: ThemeColors;
}>();

const emit = defineEmits<{
  "update:model": [model: DiagramModel];
}>();

const containerRef = ref<HTMLElement | null>(null);

const getProps = () =>
  ({
    nodeId: props.nodeId,
    model: props.model,
    variant: props.variant,
    isDark: props.isDark,
    t: props.themeColors,
    onModelChange: (model: DiagramModel) => emit("update:model", model),
  }) as StepEditorBridgeProps;

const { loading, error } = useReactBridge<StepEditorBridgeProps>(
  containerRef,
  getProps,
  () => import("flowchart-sequence-designer/ui").then((m) => m.StepEditor as any),
);
</script>

<template>
  <span v-if="loading" :style="{ color: '#888', fontSize: '14px', padding: '8px', display: 'inline-block' }">Loading editor…</span>
  <span v-if="error" :style="{ color: '#c00', fontSize: '14px', padding: '8px', display: 'inline-block' }">{{ error }}</span>
  <div ref="containerRef" :style="{ display: loading || error ? 'none' : 'block' }" />
</template>
