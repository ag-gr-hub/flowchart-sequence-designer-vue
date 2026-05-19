export { default as FsdDiagram } from "./FsdDiagram.vue";
export { default as FsdSequence } from "./FsdSequence.vue";
export { default as FsdToolbar } from "./FsdToolbar.vue";
export { default as FsdStepEditor } from "./FsdStepEditor.vue";
export { ReactBridge } from "./react-bridge";
export { useReactBridge } from "./useReactBridge";

// Re-export useful types from the core package
export type {
  DiagramModel,
  ExportFormat,
} from "flowchart-sequence-designer";
export type {
  DiagramEditorProps,
  SequenceEditorProps,
  ThemeColors,
} from "flowchart-sequence-designer/ui";
