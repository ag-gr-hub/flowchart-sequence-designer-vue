# @flowchart-sequence-designer/vue

[![npm version](https://img.shields.io/npm/v/@flowchart-sequence-designer/vue.svg)](https://www.npmjs.com/package/@flowchart-sequence-designer/vue)
[![CI](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions/workflows/test.yml/badge.svg)](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions/workflows/test.yml)
[![CodeQL](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions/workflows/codeql.yml/badge.svg)](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Vue 3 wrapper components for [flowchart-sequence-designer](https://www.npmjs.com/package/flowchart-sequence-designer) — a visual editor for flowcharts, question flows, journey maps, and sequence diagrams.

**[▶ Live Demo](https://ag-gr-hub.github.io/flowchart-sequence-designer-vue/)**

---

## Framework Wrappers

| Framework | Package | Demo |
|-----------|---------|------|
| React (core) | [`flowchart-sequence-designer`](https://www.npmjs.com/package/flowchart-sequence-designer) | [Demo](https://ag-gr-hub.github.io/flowchart-sequence-designer/) |
| Angular | [`@flowchart-sequence-designer/angular`](https://www.npmjs.com/package/@flowchart-sequence-designer/angular) | [Demo](https://ag-gr-hub.github.io/flowchart-sequence-designer-angular/) |
| **Vue** | **`@flowchart-sequence-designer/vue`** | **[Demo](https://ag-gr-hub.github.io/flowchart-sequence-designer-vue/)** |

---

## Features

- 🎨 **Four editor variants** — Flowchart, Question Flow, Journey Map, Sequence
- 🔄 **Full v-model support** — two-way data binding with Vue's reactivity
- 🌙 **Theming** — Light, dark, and auto modes with custom color overrides
- 📦 **Tree-shakeable** — ESM + CJS dual build, import only what you need
- 🔒 **TypeScript-first** — Full type definitions for all components and props
- ⚡ **Lazy-loaded** — Editor code-split for optimal bundle size
- 📱 **Touch-friendly** — Pinch-to-zoom, gesture support
- ♿ **Accessible** — Keyboard navigation, ARIA labels, screen reader support

---

## Installation

```bash
npm install @flowchart-sequence-designer/vue flowchart-sequence-designer react react-dom
```

### Peer Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vue` | ≥3.3.0 | Vue 3 runtime |
| `flowchart-sequence-designer` | ≥1.2.0 | Core editor engine + React UI |
| `react` | ≥18.0.0 | React runtime (used internally by editor) |
| `react-dom` | ≥18.0.0 | React DOM renderer |

> 💡 **Why React?** The editor is built with React. This wrapper embeds it inside Vue using a bridge pattern. React is loaded once and shared — it doesn't bloat your bundle if you're already using it elsewhere.

---

## Quick Start

### Composition API (Recommended)

```vue
<script setup lang="ts">
import { ref } from "vue";
import { FsdDiagram } from "@flowchart-sequence-designer/vue";
import type { DiagramModel } from "flowchart-sequence-designer";

const model = ref<DiagramModel | undefined>();

function handleChange(newModel: DiagramModel) {
  console.log("Model updated:", newModel.nodes.length, "nodes");
}
</script>

<template>
  <FsdDiagram
    v-model="model"
    variant="flowchart"
    height="600"
    theme="auto"
    @update:model-value="handleChange"
  />
</template>
```

### Options API

```vue
<template>
  <FsdDiagram
    :model-value="model"
    variant="flowchart"
    height="600"
    @update:model-value="model = $event"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FsdDiagram } from "@flowchart-sequence-designer/vue";

export default defineComponent({
  components: { FsdDiagram },
  data() {
    return { model: undefined };
  },
});
</script>
```

### Sequence Diagram

```vue
<script setup lang="ts">
import { FsdSequence } from "@flowchart-sequence-designer/vue";
</script>

<template>
  <FsdSequence height="500px" theme="dark" />
</template>
```

---

## Components

| Component | Description |
|-----------|-------------|
| `<FsdDiagram>` | Flowchart / Question Flow / Journey Map editor |
| `<FsdSequence>` | Sequence diagram editor |
| `<FsdToolbar>` | Standalone export/import toolbar |
| `<FsdStepEditor>` | Node property editor panel |

---

## API Reference

### `<FsdDiagram>`

The main editor component supporting three diagram variants.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `DiagramModel` | `undefined` | Diagram data (v-model) |
| `height` | `string \| number` | `"500px"` | Editor height (px, %, vh, calc()) |
| `variant` | `"flowchart" \| "question-flow" \| "journey-map"` | `"flowchart"` | Editor mode |
| `theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Color theme |
| `themeOverrides` | `Partial<ThemeColors>` | `undefined` | Custom color tokens |
| `allowImport` | `boolean` | `true` | Show import button |
| `allowedExports` | `ExportFormat[]` | all formats | Available export formats |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `DiagramModel` | Emitted on every diagram change (v-model) |
| `export` | `{ format: ExportFormat; content: string \| Blob }` | Emitted when user exports |

---

### `<FsdSequence>`

Sequence diagram editor.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `DiagramModel` | `undefined` | Sequence data (v-model) |
| `height` | `string \| number` | `"500px"` | Editor height |
| `theme` | `"light" \| "dark" \| "auto"` | `"auto"` | Color theme |
| `themeOverrides` | `Partial<ThemeColors>` | `undefined` | Custom colors |
| `allowImport` | `boolean` | `true` | Show import |
| `allowedExports` | `ExportFormat[]` | all | Export formats |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `DiagramModel` | Model changed (v-model) |
| `export` | `{ format, content }` | User exported |

---

### `<FsdToolbar>`

Standalone toolbar for export/import controls.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `allowedExports` | `ExportFormat[]` | all | Available exports |
| `allowImport` | `boolean` | `true` | Show import button |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `exportRequest` | `ExportFormat` | Export button clicked |
| `importRequest` | — | Import button clicked |

---

### `<FsdStepEditor>`

Panel for editing properties of a selected node.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `nodeId` | `string` | **required** | ID of node to edit |
| `model` | `DiagramModel` | **required** | Current diagram model |
| `variant` | `string` | `undefined` | Editor variant |
| `isDark` | `boolean` | `false` | Dark mode flag |
| `themeColors` | `ThemeColors` | `undefined` | Color overrides |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:model` | `DiagramModel` | Model updated from property change |

---

## v-model Support

Both `<FsdDiagram>` and `<FsdSequence>` support Vue's v-model pattern:

```vue
<!-- Two-way binding with v-model -->
<FsdDiagram v-model="diagramModel" variant="flowchart" />

<!-- Equivalent expanded form -->
<FsdDiagram
  :model-value="diagramModel"
  @update:model-value="diagramModel = $event"
/>
```

When the user edits the diagram, the component emits `update:modelValue` with the new model. Vue's reactivity system keeps your parent component in sync automatically.

---

## Height Handling

The `height` prop accepts multiple formats:

```vue
<!-- Number (pixels) -->
<FsdDiagram :height="600" />

<!-- String pixels -->
<FsdDiagram height="600" />

<!-- Percentage -->
<FsdDiagram height="100%" />

<!-- Viewport units -->
<FsdDiagram height="80vh" />

<!-- calc() expressions -->
<FsdDiagram height="calc(100vh - 64px)" />
```

---

## Theming

### Theme Modes

```vue
<FsdDiagram theme="light" />   <!-- Always light -->
<FsdDiagram theme="dark" />    <!-- Always dark -->
<FsdDiagram theme="auto" />    <!-- Follows prefers-color-scheme -->
```

### Custom Colors

```vue
<FsdDiagram
  theme="dark"
  :theme-overrides="{
    canvasBg: '#1a1a2e',
    nodeBg: '#16213e',
    nodeBorder: '#42b883',
    accent: '#42b883',
    text: '#e0e0e0',
  }"
/>
```

### ThemeColors Tokens

| Token | Description |
|-------|-------------|
| `canvasBg` | Canvas background color |
| `nodeBg` | Node fill color |
| `nodeBorder` | Node border/stroke |
| `accent` | Accent (selections, handles, active states) |
| `text` | Primary text color |
| `edgeLine` | Edge/connection line color |
| `gridLine` | Grid line color |
| `selectionBg` | Selection rectangle fill |

---

## Export & Import

### Export Formats

| Format | Content Type | Description |
|--------|-------------|-------------|
| `json` | `string` | Full model as JSON (round-trip safe) |
| `mermaid` | `string` | Mermaid diagram syntax |
| `svg` | `string` | SVG vector markup |
| `png` | `Blob` | PNG raster image |

### Handling Exports

```vue
<script setup>
import { FsdDiagram } from "@flowchart-sequence-designer/vue";

function handleExport({ format, content }) {
  if (format === "png") {
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.png";
    a.click();
    URL.revokeObjectURL(url);
  } else if (format === "json") {
    localStorage.setItem("savedDiagram", content);
  } else {
    console.log(format, content);
  }
}
</script>

<template>
  <FsdDiagram
    :allowed-exports="['json', 'svg', 'png']"
    @export="handleExport"
  />
</template>
```

### Programmatic Import

```typescript
import { fromMermaid, fromJSON } from "flowchart-sequence-designer";

// From Mermaid syntax
const model = fromMermaid(`graph TD
  A[Start] --> B[Process]
  B --> C[End]`);

// From previously saved JSON
const model = fromJSON(localStorage.getItem("savedDiagram"));
```

---

## Programmatic API

### Flowchart Builder

```typescript
import { flowchart } from "flowchart-sequence-designer";

const model = flowchart()
  .start("Begin")
  .step("Process Data")
  .decision("Valid?")
    .yes().step("Save").end("Done")
    .no().step("Retry").end("Failed")
  .build();
```

### Sequence Builder

```typescript
import { sequence } from "flowchart-sequence-designer";

const model = sequence()
  .participant("Client")
  .participant("Server")
  .participant("DB")
  .message("Client", "Server", "POST /api/data")
  .message("Server", "DB", "INSERT INTO...")
  .message("DB", "Server", "OK")
  .message("Server", "Client", "201 Created")
  .build();
```

### Model API

```typescript
import { Model } from "flowchart-sequence-designer";

const m = Model.from(diagramModel);
m.addNode({ id: "n1", label: "New Step", x: 100, y: 200 });
m.addEdge({ source: "start", target: "n1" });
m.removeNode("old-node");

const updated = m.toModel();
```

---

## Presets & Empty Models

```typescript
import { presetFlowchartModel, presetSequenceModel, emptyModel } from "flowchart-sequence-designer/ui";

// Rich preset with sample content
const preset = presetFlowchartModel();

// Empty canvas
const blank = emptyModel("flowchart");
```

---

## useReactBridge Composable

For advanced use cases, you can use the internal composable directly:

```typescript
import { ref } from "vue";
import { useReactBridge } from "@flowchart-sequence-designer/vue";

const container = ref<HTMLElement | null>(null);

const { loading, error } = useReactBridge(
  container,
  () => ({ height: "100%", theme: "dark" as const }),
  () => import("flowchart-sequence-designer/ui").then((m) => m.DiagramEditor),
);
```

### Parameters

| Param | Type | Description |
|-------|------|-------------|
| `containerRef` | `Ref<HTMLElement \| null>` | Template ref for mount target |
| `getProps` | `() => P` | Function returning React props (deeply watched) |
| `componentImport` | `() => Promise<ComponentType>` | Dynamic import for the React component |

### Returns

| Property | Type | Description |
|----------|------|-------------|
| `loading` | `Ref<boolean>` | True while editor is loading |
| `error` | `Ref<string \| null>` | Error message if load failed |
| `getBridge` | `() => ReactBridge \| null` | Access the underlying bridge instance |

---

## TypeScript

All components ship with full type definitions:

```typescript
import type { DiagramModel, ExportFormat } from "flowchart-sequence-designer";
import type { DiagramEditorProps, SequenceEditorProps, ThemeColors } from "flowchart-sequence-designer/ui";
```

### tsconfig Requirements

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

---

## Architecture

This package uses a **React Bridge** pattern to embed the React-based editor inside Vue:

```
Vue Component (SFC)
  └─ useReactBridge composable
       ├─ onMounted → dynamic import() editor component
       ├─ ReactBridge.mount(containerRef) → createRoot + render
       ├─ watch(props) → bridge.update(newProps)
       └─ onUnmounted → bridge.unmount()
```

Key characteristics:

- ✅ **No interop library** — Direct React root mounting, no vue-react bridge needed
- ✅ **Isolated rendering** — React re-renders don't trigger Vue reactivity
- ✅ **Lazy loading** — Editor loaded only when component mounts (code-split)
- ✅ **Clean lifecycle** — Proper unmount prevents memory leaks
- ✅ **No zones** — Simpler than Angular (no NgZone management needed)

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` / `⌘Z` | Undo |
| `Ctrl+Y` / `⌘⇧Z` | Redo |
| `Ctrl+A` / `⌘A` | Select all |
| `Delete` / `Backspace` | Delete selected |
| `Ctrl+C` / `⌘C` | Copy |
| `Ctrl+V` / `⌘V` | Paste |
| `Ctrl+D` / `⌘D` | Duplicate |
| `Escape` | Deselect / Cancel |
| `+` / `-` | Zoom in/out |
| `Ctrl+0` / `⌘0` | Reset zoom |
| `Space + Drag` | Pan canvas |

---

## Accessibility & Touch

- Full keyboard navigation (Tab through nodes, Enter to select)
- ARIA labels on all interactive elements
- Touch gestures: pinch-to-zoom, two-finger pan
- Compatible with high contrast mode
- Screen reader announcements for state changes

---

## Editor Features

- **Drag-and-drop** node creation from palette
- **Smart connectors** with auto-routing
- **Multi-select** with Shift+Click or rubber-band selection
- **Copy/paste** across browser tabs (clipboard API)
- **Undo/redo** with configurable history depth
- **Grid snapping** with configurable grid size
- **Auto-layout** algorithms (dagre-based)
- **Mini-map** for large diagrams
- **Zoom controls** (mouse wheel, trackpad, buttons)
- **Label editing** with inline text editor

---

## Security

- No external network calls from the editor
- All rendering is client-side (SVG + Canvas)
- No eval() or dynamic code execution
- Content Security Policy compatible
- User input is sanitized (XSS-safe label rendering)

---

## Requirements

| Requirement | Version |
|-------------|---------|
| Vue | ≥3.3.0 |
| Node.js (build) | ≥18 |
| TypeScript (optional) | ≥5.0 |
| Browsers | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ |

---

## Building from Source

```bash
git clone https://github.com/ag-gr-hub/flowchart-sequence-designer-vue.git
cd flowchart-sequence-designer-vue
npm install
npm run build        # Build library
npm test             # Run tests
npm run typecheck    # Type check

# Demo app
cd demo
npm install
npm run dev          # Start dev server
npm run build        # Production build
```

---

## Troubleshooting

### "Invalid hook call" Error

Multiple React instances loaded. Add `resolve.dedupe` to your Vite config:

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
```

### Editor Not Rendering

1. Verify all peer dependencies are installed
2. Ensure the container has a non-zero height (use explicit `height` prop)
3. Check browser console for dynamic import errors
4. Verify `moduleResolution` is `"bundler"` in tsconfig

### "Cannot find module" TypeScript Error

Ensure your tsconfig uses bundler resolution:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

### Webpack Users

If using Webpack instead of Vite, ensure `.vue` files are handled by `vue-loader` and add an alias for React deduplication:

```javascript
// webpack.config.js
resolve: {
  alias: {
    react: path.resolve('./node_modules/react'),
    'react-dom': path.resolve('./node_modules/react-dom'),
  },
}
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](LICENSE) © ag-gr-hub
