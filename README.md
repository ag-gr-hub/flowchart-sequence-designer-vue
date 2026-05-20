# @flowchart-sequence-designer/vue

[![npm](https://img.shields.io/npm/v/@flowchart-sequence-designer/vue)](https://www.npmjs.com/package/@flowchart-sequence-designer/vue)
[![CI](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions/workflows/test.yml/badge.svg)](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions)
[![CodeQL](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions/workflows/codeql.yml/badge.svg)](https://github.com/ag-gr-hub/flowchart-sequence-designer-vue/actions/workflows/codeql.yml)

Vue 3 wrapper for [flowchart-sequence-designer](https://www.npmjs.com/package/flowchart-sequence-designer) — embed the full-featured flowchart & sequence-diagram editor in Vue apps using Composition API components with full v-model support.

**🔗 [Live demo & developer docs →](https://ag-gr-hub.github.io/flowchart-sequence-designer-vue/)**
Open it to drive the editor, switch variants (Flowchart / Question / Journey / Sequence), and explore the docs tab for API snippets. Every variant boots with a working sample diagram so you can poke without any setup.

## Installation

```bash
npm install @flowchart-sequence-designer/vue flowchart-sequence-designer react react-dom
```

Vue 3.3+ is required. The core API has zero runtime dependencies; React 18+ is a peer dependency for the visual editor.

> 💡 **Why React?** The editor is built with React. This wrapper embeds it inside Vue using a bridge pattern. React is loaded once and shared — it doesn't bloat your bundle if you're already using it elsewhere.

## Components

| Component | Description |
|-----------|-------------|
| `<FsdDiagram>` | Full diagram editor (flowchart/question/journey) |
| `<FsdSequence>` | Sequence diagram editor |
| `<FsdToolbar>` | Standalone export/import toolbar |
| `<FsdStepEditor>` | Node property editor panel |

All components use `<script setup>` and support Vue's v-model pattern out of the box.

## Quick Start

### Composition API (Recommended)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { FsdDiagram } from '@flowchart-sequence-designer/vue';
import type { DiagramModel } from 'flowchart-sequence-designer';

const model = ref<DiagramModel | undefined>();

function onModelChange(newModel: DiagramModel) {
  console.log('Model updated:', newModel.nodes.length, 'nodes');
}
</script>

<template>
  <FsdDiagram
    v-model="model"
    variant="flowchart"
    height="600"
    theme="auto"
    @update:model-value="onModelChange"
  />
</template>
```

That's it — no provider, no theme setup, no required props. The editor
mounts with a sample diagram, a working toolbar, undo/redo, drag-to-pan,
scroll-to-zoom, and export buttons for Mermaid / PlantUML / JSON / SVG /
PNG. Pass `theme="dark"` or `:theme-overrides="brandColors"` to
brand-match, or `:model-value="emptyModel('flowchart')"` to start blank.

### Sequence Diagram Editor

```vue
<script setup lang="ts">
import { FsdSequence } from '@flowchart-sequence-designer/vue';
import { presetSequenceModel } from 'flowchart-sequence-designer/ui';

const model = presetSequenceModel();
</script>

<template>
  <FsdSequence :model-value="model" height="500" theme="auto" />
</template>
```

### Using with an Initial Model

```typescript
import { presetFlowchartModel, emptyModel } from 'flowchart-sequence-designer/ui';

// Pre-built flowchart with sample nodes
const flowchart = presetFlowchartModel('flowchart');

// Empty model of any type
const blank = emptyModel('flowchart', 'question');
```

---

## v-model Support

Both `<FsdDiagram>` and `<FsdSequence>` support Vue's v-model:

```vue
<!-- Two-way binding -->
<FsdDiagram v-model="diagramModel" variant="flowchart" />

<!-- Equivalent expanded form -->
<FsdDiagram
  :model-value="diagramModel"
  @update:model-value="diagramModel = $event"
/>
```

When the user edits the diagram, the component emits `update:modelValue` with the new model. Vue's reactivity system keeps your parent component in sync automatically.

---

## Programmatic API

The core library (`flowchart-sequence-designer`) exposes a fluent builder API, import/export functions, and a low-level Model class. Import them directly from the core package.

### Flowchart builder

```typescript
import { flowchart } from 'flowchart-sequence-designer';

const diagram = flowchart('Order Flow')
  .node('start',   'Start',           { shape: 'circle' })
  .node('check',   'Payment valid?',  { shape: 'diamond' })
  .node('success', 'Confirm order',   { shape: 'rectangle' })
  .node('fail',    'Reject',          { shape: 'rectangle' })
  .edge('start',   'check')
  .edge('check',   'success', { label: 'Yes' })
  .edge('check',   'fail',    { label: 'No' });

console.log(diagram.toMermaid());
```

#### Node shapes

| Shape | Description |
|---|---|
| `rectangle` | Standard process box (default) |
| `diamond` | Decision / branch |
| `circle` | Start or end terminal |
| `parallelogram` | Input / output |

#### Edge options

```typescript
.edge(from, to, {
  label?: string,
  style?: 'solid' | 'dashed' | 'dotted',
  arrowhead?: 'arrow' | 'open' | 'none',
})
```

---

### Sequence diagram builder

```typescript
import { sequence } from 'flowchart-sequence-designer';

const diagram = sequence('Auth Flow')
  .actor('User')
  .actor('Server')
  .message('User',   'Server', 'POST /login')
  .message('Server', 'User',   '200 OK + token', { style: 'dashed' });

console.log(diagram.toMermaid());
```

Actors auto-register from `message()` calls, so you can skip `.actor()` if you prefer.

---

### Export formats

Every builder exposes the same export methods:

```typescript
diagram.toMermaid()   // string
diagram.toPlantUML()  // string
diagram.toJSON()      // string (serialised DiagramModel)
diagram.toSVG()       // string (SVG markup)
diagram.toPNG()       // Promise<Blob>  (browser only)
```

---

### Import

```typescript
import { fromMermaid, fromJSON } from 'flowchart-sequence-designer';

const model = fromMermaid('graph TD; A-->B; B-->C');
const model2 = fromJSON(jsonString);
```

Round-trip fidelity: `fromMermaid(diagram.toMermaid())` produces an equivalent model.

Feed imported models directly into the Vue component:

```vue
<script setup>
import { ref } from 'vue';
import { FsdDiagram } from '@flowchart-sequence-designer/vue';
import { fromMermaid } from 'flowchart-sequence-designer';

const model = ref(fromMermaid('graph TD; A-->B; B-->C'));
</script>

<template>
  <FsdDiagram v-model="model" />
</template>
```

---

### Exporter / importer round-trip rules

The five export formats trade fidelity for portability:

| Format | Round-trip | Preserved | Dropped or lossy |
|---|---|---|---|
| **JSON** | ✅ full | every field — `variant`, `metadata`, `waypoint`, x/y positions, edge arrowheads, message order | nothing |
| **Mermaid (flowchart)** | partial | node shapes (`[]` `{}` `(())` `[/]`), labels, edge connectors (`-->`, `-.->`, `---`, `-.-`), edge labels, `subgraph` → `metadata.group` | positions, `waypoint`, `metadata.answers`, `variant`. Dotted edges collapse to dashed. |
| **Mermaid (sequence)** | partial | actor order, message arrows (`->>`, `-->>`), labels | message metadata, styling overrides |
| **PlantUML (flowchart)** | export-only | edge styles (`-->` / `-[dashed]->` / `-[dotted]->`), labels, node id | shape distinctions (PlantUML state-diagram syntax is coarser), positions, `metadata`, `variant` |
| **PlantUML (sequence)** | export-only | actor order, message style (`->`, `-->`), labels | – |
| **SVG** | export-only (rendered) | full visual parity with the canvas — same dot grid, same edge curves, same node styling | – |
| **PNG** | export-only (rendered, **browser-only**) | same as SVG, rasterized at `devicePixelRatio` | – |

If you need 100% round-trip fidelity, use JSON. If you need a format that
GitHub renders inline in markdown, use Mermaid. If you need a polished
image for documentation, use SVG or PNG.

---

### Presets & empty models

```typescript
import {
  presetFlowchartModel,
  presetSequenceModel,
  emptyModel,
} from 'flowchart-sequence-designer/ui';

presetFlowchartModel('flowchart')  // 6-node order flow with one decision
presetFlowchartModel('question')   // 1-question / 3-answer router
presetFlowchartModel('journey')    // 5-step onboarding sequence
presetSequenceModel()              // 3-actor login handshake

emptyModel('flowchart')            // { type:'flowchart', variant:'flowchart', nodes:[], edges:[] }
emptyModel('flowchart', 'journey') // same with variant: 'journey'
emptyModel('sequence')             // { type:'sequence', nodes:[], edges:[], actors:[], messages:[] }
```

All presets return a deep clone — mutate the result freely.

---

### Working with the model directly

```typescript
import { Model } from 'flowchart-sequence-designer';

const m = new Model('flowchart');
m.addNode({ id: 'a', label: 'Step A', shape: 'rectangle' });
m.addNode({ id: 'b', label: 'Step B', shape: 'rectangle' });
m.addEdge({ id: 'e1', from: 'a', to: 'b', label: 'next' });

console.log(m.toMermaid());
```

---

## API Reference

### `<FsdDiagram>`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `DiagramModel` | preset | Pre-populate the editor (v-model) |
| `height` | `string \| number` | `'500px'` | Container height (px, %, vh, calc()) |
| `variant` | `'flowchart' \| 'question' \| 'journey'` | `'flowchart'` | Editor variant |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme |
| `themeOverrides` | `Partial<ThemeColors>` | — | Custom colors |
| `allowedExports` | `ExportFormat[]` | all | Restrict export menu |
| `allowImport` | `boolean` | `true` | Show import button |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `DiagramModel` | Emitted on every edit (v-model) |
| `export` | `{ format, content }` | Emitted when user exports |

### `<FsdSequence>`

Same as `<FsdDiagram>` except no `variant` prop. Accepts `Partial<SequenceThemeColors>` for `themeOverrides`.

### `<FsdToolbar>`

| Prop | Type | Description |
|------|------|-------------|
| `allowedExports` | `ExportFormat[]` | Which formats to show |
| `allowImport` | `boolean` | Show import button |

| Event | Payload | Description |
|-------|---------|-------------|
| `exportRequest` | `ExportFormat` | Format the user chose |
| `importRequest` | `string` | Raw text the user imported |

### `<FsdStepEditor>`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `nodeId` | `string` | ✓ | ID of the node to edit |
| `model` | `DiagramModel` | ✓ | Current diagram model |
| `variant` | `DiagramVariant` | | Editor variant |
| `isDark` | `boolean` | | Dark mode flag |
| `themeColors` | `ThemeColors` | | Theme color overrides |

| Event | Payload | Description |
|-------|---------|-------------|
| `update:model` | `DiagramModel` | Updated model after edit |

---

### Diagram variants

| Variant | Description |
|---|---|
| `flowchart` | General purpose — any shapes, freeform connections |
| `question` | Each node is a question with lettered answer options (A, B, C…). Each answer has its own connection port. |
| `journey` | Numbered milestone steps — user path or process walkthrough |

---

### Editor features

**Canvas**
- Drag nodes to reposition (snaps to 24px grid)
- Scroll to zoom in/out (pinch to zoom on touch)
- Drag the canvas background to pan (one-finger pan on touch)
- Double-click a node to rename it inline
- Dashed alignment guides appear when a dragged node lines up with a sibling's edge or center, and it snaps within 4 px
- Bottom-right minimap — click or drag to pan the viewport
- Accessibility: every node, port, and control is keyboard-reachable with a visible focus ring; selection / add / delete actions announce via an `aria-live` status region; the edge-flow animation honours `prefers-reduced-motion`

**Connecting nodes**
- Hover a node to reveal the bottom port dot, then drag it to another node
- Question variant: each answer row has its own port dot — drag it to route that answer to a specific node

**Node Navigator (left panel)**
- Lists all nodes with shape badge, label, and connection counts
- Search/filter by name
- Click any row to jump to that node and center the canvas on it
- Collapses to a slim icon strip

**Step Editor (right panel)**
- Appears when a node is selected
- Edit the node name, change its shape
- Manage branches / answer options (add, remove, reorder)
- Question variant shows connection status per answer

**Context menu** (right-click)
- On canvas: Add node at cursor, Re-center, Undo, Redo
- On node: Rename, Duplicate, Disconnect all edges, Delete
- On edge: Style (solid/dashed/dotted), Arrowhead, Reset routing, Delete
- On touch devices: long-press the canvas (~550ms) opens the canvas menu

---

### Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Ctrl+0` | Fit all nodes in view |
| `Ctrl+C` / `Ctrl+V` | Copy and paste the current selection (internal edges preserved, +24 px offset on paste) |
| `Ctrl+D` | Duplicate the current selection |
| `Delete` / `Backspace` | Remove the current selection |
| `Escape` | Deselect, cancel in-flight edge drag, close context menu |
| `Arrow` keys | Nudge selection by 1 grid unit (Shift = 4 units) |
| `Alt+Arrow` | Traverse to the nearest node in that direction from the current selection |
| `Shift+click` | Toggle a node in/out of the current selection |
| `Shift+drag` (empty canvas) | Box-select — add every intersected node to the selection |
| Double-click edge label | Rename the edge label inline |
| Drag edge midpoint | Route the edge through a waypoint (right-click → Reset routing to clear) |

---

### Theming

```vue
<!-- Force dark -->
<FsdDiagram theme="dark" />

<!-- Force light -->
<FsdDiagram theme="light" />

<!-- Follow system prefers-color-scheme (default) -->
<FsdDiagram theme="auto" />
```

To match the editor to a host application's brand, pass `:theme-overrides` —
a `Partial<ThemeColors>` that is shallow-merged on top of the resolved
light/dark palette:

```vue
<script setup lang="ts">
import { FsdDiagram } from '@flowchart-sequence-designer/vue';
import type { ThemeColors } from 'flowchart-sequence-designer/ui';

const brand: Partial<ThemeColors> = {
  canvas: '#0b1020',
  nodeFill: '#111a2e',
  nodeStroke: '#2b3a5a',
  nodeSelectedFill: '#1a2447',
  edgeColor: '#7b8aa6',
  textPrimary: '#e6edf7',
};
</script>

<template>
  <FsdDiagram theme="dark" :theme-overrides="brand" />
</template>
```

#### ThemeColors token groups (flowchart)

| Token group | Members | Where it shows up |
|---|---|---|
| Canvas | `canvas`, `dot` | Background + dot grid |
| Nodes | `nodeFill`, `nodeStroke`, `nodeSelectedFill` | Node body, border, selection tint |
| Edges | `edgeColor` | Edge stroke + arrowhead |
| Type ramp | `textPrimary`, `textSecondary`, `textMuted` | Labels, hints, secondary text |
| Chrome — panel | `panelBg`, `panelBorder` | Side panel surface |
| Chrome — controls | `ctrlsBg`, `ctrlsBorder` | Toolbar, zoom controls |
| Chrome — input | `inputBg`, `inputBorder`, `inputText` | Form fields in the side panel |
| Chrome — card | `cardBg`, `cardBorder` | Answer rows, branch rows |
| Chrome — section | `sectionBorder` | Divider between panel sections |
| Buttons | `btnSecBg`, `btnSecText`, `shapeBtnBg`, `shapeBtnBorder` | Secondary buttons, shape picker |
| Accents | `addFormBg`, `bannerBg`, `labelText`, `hintText`, `statusBg` | Add-form backdrop, validation banner |

#### SequenceThemeColors (sequence)

The sequence editor accepts the same `:theme-overrides` prop with a
slightly different shape — `Partial<SequenceThemeColors>`. It drops
node-specific tokens and adds `lifeline`, `arrow`, and `actorFill` /
`actorStroke` / `actorText` for the swim-lane elements.

---

### Restricting exports and import

```vue
<!-- Only allow JSON and SVG download -->
<FsdDiagram :allowed-exports="['json', 'svg']" />

<!-- Hide the import button entirely -->
<FsdDiagram :allow-import="false" />

<!-- Handle exports yourself (e.g. send to an API) -->
<FsdDiagram @export="handleExport" />
```

```typescript
function handleExport(e: { format: string; content: string | Blob }) {
  if (e.format === 'png') {
    const url = URL.createObjectURL(e.content as Blob);
    // download or upload...
  }
}
```

---

## Height Handling

The `height` prop accepts multiple formats:

```vue
<FsdDiagram :height="600" />           <!-- Number (pixels) -->
<FsdDiagram height="600" />            <!-- String pixels -->
<FsdDiagram height="100%" />           <!-- Percentage -->
<FsdDiagram height="80vh" />           <!-- Viewport units -->
<FsdDiagram height="calc(100vh - 64px)" /> <!-- calc() -->
```

---

## Accessibility & touch

The editor is keyboard-first and screen-reader-aware. Every interaction
reachable by mouse has a keyboard equivalent; every state change announces
via a polite `aria-live` region.

**Keyboard navigation** — Every node, port, and toolbar control is reachable
with Tab; selection moves with Arrow keys (1 grid unit, or 4 with Shift);
Alt+Arrow traverses the graph to the nearest connected neighbor in that
direction. The focus ring is visible at all times.

**ARIA roles** — The canvas is an `application` region with an `aria-label`;
selection, add, and delete actions update an `aria-live="polite"` status
region announced as "Selected {label}", "Added node {label}", etc. The
toolbar uses native `<button>` elements with explicit labels.

**Reduced motion** — The animated edge-flow dash honours
`prefers-reduced-motion` — when set, the dash freezes and the canvas renders
with no animation.

**Touch interactions:**
| Action | Gesture |
|---|---|
| Pan | One-finger drag on the canvas background |
| Zoom | Two-finger pinch |
| Context menu | Long-press (~550 ms) on the canvas or on a node |
| Larger hit targets | Port circles auto-enlarge on coarse-pointer devices (24 px vs. 14 px on mouse) |
| Drag node | Press and drag the node body. The 8 px drag threshold lets you tap to select without nudging. |

---

## Security

This package uses the same core editor as the React version, which takes
security seriously:

- **Input sanitization** — All user-provided text is sanitized before rendering
  (HTML tags, `javascript:`/`data:`/`vbscript:` URIs, `on*` event handlers, and
  control characters are stripped).
- **Resource limits** — Importers enforce hard caps (500 nodes, 2000 edges, 100
  actors, 2000 messages, 2MB input) to prevent resource exhaustion.
- **Prototype pollution defense** — JSON importer strips `__proto__`,
  `constructor`, and `prototype` keys recursively.
- **SVG export** — Defence-in-depth: sanitize first, then XML-escape. Safe even
  if consumed by less-strict parsers.
- **No `eval` / `innerHTML`** — The codebase never uses dynamic code execution
  or raw HTML injection.
- **CodeQL** — Automated security scanning runs weekly and on every PR.
- **Dependabot** — Dependency updates monitored weekly.

---

## Framework Wrappers

| Framework | Package | Docs |
|-----------|---------|------|
| React | [`flowchart-sequence-designer`](https://www.npmjs.com/package/flowchart-sequence-designer) | [Docs & Demo](https://ag-gr-hub.github.io/flowchart-sequence-designer/) |
| Angular | [`@flowchart-sequence-designer/angular`](https://www.npmjs.com/package/@flowchart-sequence-designer/angular) | [Docs & Demo](https://ag-gr-hub.github.io/flowchart-sequence-designer-angular/) |
| Vue | [`@flowchart-sequence-designer/vue`](https://www.npmjs.com/package/@flowchart-sequence-designer/vue) | [Docs & Demo](https://ag-gr-hub.github.io/flowchart-sequence-designer-vue/) |

---

## TypeScript Types

For convenience, common types can be imported directly:

```typescript
import type {
  DiagramModel,
  DiagramNode,
  DiagramEdge,
  DiagramType,
  DiagramVariant,
  ExportFormat,
  NodeShape,
  SequenceMessage,
} from 'flowchart-sequence-designer';

import type {
  ThemeColors,
  SequenceThemeColors,
} from 'flowchart-sequence-designer/ui';
```

### `DiagramModel`

```typescript
interface DiagramModel {
  type: 'flowchart' | 'sequence';
  variant?: DiagramVariant;    // 'flowchart' | 'question' | 'journey' (flowchart-type only)
  title?: string;
  nodes: DiagramNode[];        // always present (empty array for sequence models)
  edges: DiagramEdge[];        // always present (empty array for sequence models)
  actors?: string[];           // sequence models only — ordered actor names
  messages?: SequenceMessage[]; // sequence models only — ordered messages
}
```

### `DiagramNode`

```typescript
interface DiagramNode {
  id: string;
  label: string;
  shape?: 'rectangle' | 'diamond' | 'circle' | 'parallelogram';
  x?: number;
  y?: number;
  metadata?: Record<string, unknown>;
  // question variant: metadata.answers = string[]
}
```

### `DiagramEdge`

```typescript
interface DiagramEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  arrowhead?: 'arrow' | 'none' | 'open';
  waypoint?: { x: number; y: number }; // manual routing point (JSON only)
}
```

### `SequenceMessage`

```typescript
interface SequenceMessage {
  id: string;
  from: string;            // actor name
  to: string;              // actor name
  label: string;
  style?: 'solid' | 'dashed';
}
```

---

## Architecture

This wrapper uses a lightweight **React Bridge** pattern:

1. Each Vue component creates a React root inside its template `<div ref>`
2. Vue props are mapped to React props via the bridge
3. React `onChange`/`onExport` callbacks call Vue `emit()` directly (no zones needed)
4. React internal renders run outside Vue's reactivity (no unnecessary re-renders)
5. On `onUnmounted`, the React root is cleanly unmounted

```
Vue Component (SFC)
  └─ useReactBridge composable
       ├─ onMounted → dynamic import() editor component
       ├─ ReactBridge.mount(containerRef) → createRoot + render
       ├─ watch(props) → bridge.update(newProps)
       └─ onUnmounted → bridge.unmount()
```

### Performance Characteristics

- **No interop library** — Direct React root mounting, no vue-react bridge needed
- **Isolated rendering** — React re-renders don't trigger Vue reactivity
- **Lazy-loaded** — the React editor is loaded via dynamic `import()` (code-split friendly)
- **Clean lifecycle** — Proper unmount prevents memory leaks
- **Minimal overhead** — the bridge is ~1KB; React+ReactDOM peer deps add ~45KB gzipped

---

## Package structure

```
@flowchart-sequence-designer/vue/
├── dist/
│   ├── index.js / index.cjs      ← ESM + CJS builds
│   └── index.d.ts                ← Type definitions
└── src/
    ├── react-bridge.ts            # ReactBridge class (createRoot/render/unmount)
    ├── useReactBridge.ts          # Composable: mount/watch/unmount lifecycle
    ├── FsdDiagram.vue             # <FsdDiagram> (flowchart/question/journey)
    ├── FsdSequence.vue            # <FsdSequence>
    ├── FsdToolbar.vue             # <FsdToolbar>
    ├── FsdStepEditor.vue          # <FsdStepEditor>
    └── index.ts                   # Public exports
```

---

## Building from source

```bash
git clone https://github.com/ag-gr-hub/flowchart-sequence-designer-vue.git
cd flowchart-sequence-designer-vue
npm install
npm run build        # library → dist/
npm test             # unit tests
npm run typecheck    # type check

# Demo app
cd demo
npm install
npm run dev          # dev server
npm run build        # production build
```

---

## Troubleshooting

### "Invalid hook call" Error

Multiple React instances loaded. Add `resolve.dedupe` to your Vite config:

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
});
```

### Editor Not Rendering

1. Verify all peer dependencies are installed
2. Ensure the container has a non-zero height (use explicit `height` prop)
3. Check browser console for dynamic import errors
4. Verify `moduleResolution` is `"bundler"` in tsconfig

### Webpack Users

If using Webpack instead of Vite, add an alias for React deduplication:

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

## Requirements

- Vue 3.3+
- `flowchart-sequence-designer` ≥ 1.2.0
- `react` & `react-dom` ≥ 18
- Node.js ≥ 20 (build only)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT
