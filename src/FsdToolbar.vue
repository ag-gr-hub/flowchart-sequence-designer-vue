<script setup lang="ts">
import { ref } from "vue";
import type { ExportFormat } from "flowchart-sequence-designer";
import { useReactBridge } from "./useReactBridge";

interface ToolbarBridgeProps {
  allowedExports?: ExportFormat[];
  allowImport?: boolean;
  onExport: (format: ExportFormat) => void;
  onImport?: (text: string) => void;
}

const props = defineProps<{
  allowedExports?: ExportFormat[];
  allowImport?: boolean;
}>();

const emit = defineEmits<{
  exportRequest: [format: ExportFormat];
  importRequest: [];
}>();

const containerRef = ref<HTMLElement | null>(null);

const getProps = () =>
  ({
    allowedExports: props.allowedExports,
    allowImport: props.allowImport,
    onExport: (format: ExportFormat) => emit("exportRequest", format),
    onImport: () => emit("importRequest"),
  }) as ToolbarBridgeProps;

const { loading, error } = useReactBridge<ToolbarBridgeProps>(
  containerRef,
  getProps,
  () => import("flowchart-sequence-designer/ui").then((m) => m.Toolbar as any),
);
</script>

<template>
  <span v-if="loading" :style="{ color: '#888', fontSize: '14px', padding: '8px', display: 'inline-block' }">Loading toolbar…</span>
  <span v-if="error" :style="{ color: '#c00', fontSize: '14px', padding: '8px', display: 'inline-block' }">{{ error }}</span>
  <div ref="containerRef" :style="{ display: loading || error ? 'none' : 'block' }" />
</template>
