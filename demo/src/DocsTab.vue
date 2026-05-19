<script setup lang="ts">
import { ref } from "vue";

const activeSection = ref("getting-started");

const sections = [
  { id: "getting-started", label: "Getting Started" },
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick Start" },
  { id: "components", label: "Components" },
  { id: "diagram-editor", label: "FsdDiagram" },
  { id: "sequence-editor", label: "FsdSequence" },
  { id: "toolbar", label: "FsdToolbar" },
  { id: "step-editor", label: "FsdStepEditor" },
  { id: "v-model", label: "v-model Support" },
  { id: "theming", label: "Theming" },
  { id: "export-import", label: "Export & Import" },
  { id: "composables", label: "Composables" },
  { id: "typescript", label: "TypeScript" },
  { id: "architecture", label: "Architecture" },
  { id: "keyboard", label: "Keyboard Shortcuts" },
  { id: "accessibility", label: "Accessibility" },
  { id: "frameworks", label: "Supported Frameworks" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "changelog", label: "Changelog" },
];
</script>

<template>
  <div class="docs-layout">
    <aside class="sidebar">
      <nav>
        <button
          v-for="section in sections"
          :key="section.id"
          :class="['sidebar-btn', { active: activeSection === section.id }]"
          @click="activeSection = section.id"
        >
          {{ section.label }}
        </button>
      </nav>
    </aside>

    <div class="docs-content">
      <!-- Getting Started -->
      <section v-if="activeSection === 'getting-started'" class="doc-section">
        <h1>Getting Started</h1>
        <p>
          <code>@flowchart-sequence-designer/vue</code> provides Vue 3 components that wrap the
          <a href="https://www.npmjs.com/package/flowchart-sequence-designer" target="_blank">flowchart-sequence-designer</a>
          React editor. It uses a React bridge pattern to embed the editor inside Vue apps with full
          reactivity, v-model support, and type safety.
        </p>
        <h2>Features</h2>
        <ul>
          <li>🎨 Four editor variants: Flowchart, Question Flow, Journey Map, Sequence</li>
          <li>🔄 Full v-model support for two-way data binding</li>
          <li>🌙 Light, dark, and auto theme modes with custom color overrides</li>
          <li>📦 Tree-shakeable ESM + CJS dual build</li>
          <li>🔒 TypeScript-first with full type definitions</li>
          <li>⚡ Lazy-loaded editor (code-split for performance)</li>
          <li>📱 Touch-friendly with gesture support</li>
          <li>♿ Accessible with keyboard navigation</li>
        </ul>
      </section>

      <!-- Installation -->
      <section v-if="activeSection === 'installation'" class="doc-section">
        <h1>Installation</h1>
        <div class="code-block">
          <code>npm install @flowchart-sequence-designer/vue flowchart-sequence-designer react react-dom</code>
        </div>
        <h3>Peer Dependencies</h3>
        <table class="api-table">
          <thead><tr><th>Package</th><th>Version</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td>vue</td><td>&gt;=3.3.0</td><td>Vue 3 runtime</td></tr>
            <tr><td>flowchart-sequence-designer</td><td>&gt;=1.2.0</td><td>Core editor + React UI</td></tr>
            <tr><td>react</td><td>&gt;=18.0.0</td><td>React runtime (used by editor)</td></tr>
            <tr><td>react-dom</td><td>&gt;=18.0.0</td><td>React DOM renderer</td></tr>
          </tbody>
        </table>
        <p class="note">
          💡 React is a peer dependency because the editor is built with React internally.
          It does NOT add React to your bundle if you only use Vue — it piggybacks on the
          existing React instance.
        </p>
      </section>

      <!-- Quick Start -->
      <section v-if="activeSection === 'quick-start'" class="doc-section">
        <h1>Quick Start</h1>
        <h2>Composition API (recommended)</h2>
        <div class="code-block"><pre><code>&lt;script setup lang="ts"&gt;
import { ref } from "vue";
import { FsdDiagram } from "@flowchart-sequence-designer/vue";
import type { DiagramModel } from "flowchart-sequence-designer";

const model = ref&lt;DiagramModel | undefined&gt;();

function handleChange(newModel: DiagramModel) {
  console.log("Model updated:", newModel.nodes.length, "nodes");
}
&lt;/script&gt;

&lt;template&gt;
  &lt;FsdDiagram
    v-model="model"
    variant="flowchart"
    height="600"
    theme="auto"
    @update:model-value="handleChange"
  /&gt;
&lt;/template&gt;</code></pre></div>

        <h2>Options API</h2>
        <div class="code-block"><pre><code>&lt;template&gt;
  &lt;FsdDiagram
    :model-value="model"
    variant="flowchart"
    height="600"
    @update:model-value="model = $event"
  /&gt;
&lt;/template&gt;

&lt;script lang="ts"&gt;
import { defineComponent } from "vue";
import { FsdDiagram } from "@flowchart-sequence-designer/vue";

export default defineComponent({
  components: { FsdDiagram },
  data() {
    return { model: undefined };
  },
});
&lt;/script&gt;</code></pre></div>
      </section>

      <!-- Components Overview -->
      <section v-if="activeSection === 'components'" class="doc-section">
        <h1>Components</h1>
        <table class="api-table">
          <thead><tr><th>Component</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>&lt;FsdDiagram&gt;</code></td><td>Flowchart / Question Flow / Journey Map editor</td></tr>
            <tr><td><code>&lt;FsdSequence&gt;</code></td><td>Sequence diagram editor</td></tr>
            <tr><td><code>&lt;FsdToolbar&gt;</code></td><td>Standalone export/import toolbar</td></tr>
            <tr><td><code>&lt;FsdStepEditor&gt;</code></td><td>Node property editor panel</td></tr>
          </tbody>
        </table>
      </section>

      <!-- FsdDiagram -->
      <section v-if="activeSection === 'diagram-editor'" class="doc-section">
        <h1>&lt;FsdDiagram&gt;</h1>
        <p>The main editor component for flowchart, question-flow, and journey-map diagrams.</p>
        <h2>Props</h2>
        <table class="api-table">
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>modelValue</td><td>DiagramModel</td><td>undefined</td><td>Initial diagram model (v-model)</td></tr>
            <tr><td>height</td><td>string | number</td><td>"500px"</td><td>Editor height (px, %, vh, calc())</td></tr>
            <tr><td>variant</td><td>"flowchart" | "question-flow" | "journey-map"</td><td>"flowchart"</td><td>Editor mode</td></tr>
            <tr><td>theme</td><td>"light" | "dark" | "auto"</td><td>"auto"</td><td>Color theme</td></tr>
            <tr><td>themeOverrides</td><td>Partial&lt;ThemeColors&gt;</td><td>undefined</td><td>Custom color overrides</td></tr>
            <tr><td>allowImport</td><td>boolean</td><td>true</td><td>Show import button</td></tr>
            <tr><td>allowedExports</td><td>ExportFormat[]</td><td>all formats</td><td>Available export formats</td></tr>
          </tbody>
        </table>
        <h2>Events</h2>
        <table class="api-table">
          <thead><tr><th>Event</th><th>Payload</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>update:modelValue</td><td>DiagramModel</td><td>Emitted when diagram changes (v-model)</td></tr>
            <tr><td>export</td><td>{ format, content }</td><td>Emitted when user exports</td></tr>
          </tbody>
        </table>
      </section>

      <!-- FsdSequence -->
      <section v-if="activeSection === 'sequence-editor'" class="doc-section">
        <h1>&lt;FsdSequence&gt;</h1>
        <p>Sequence diagram editor component.</p>
        <h2>Props</h2>
        <table class="api-table">
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>modelValue</td><td>SequenceModel</td><td>undefined</td><td>Initial sequence model (v-model)</td></tr>
            <tr><td>height</td><td>string | number</td><td>"500px"</td><td>Editor height</td></tr>
            <tr><td>theme</td><td>"light" | "dark" | "auto"</td><td>"auto"</td><td>Color theme</td></tr>
            <tr><td>themeOverrides</td><td>Partial&lt;ThemeColors&gt;</td><td>undefined</td><td>Custom colors</td></tr>
            <tr><td>allowImport</td><td>boolean</td><td>true</td><td>Show import button</td></tr>
            <tr><td>allowedExports</td><td>ExportFormat[]</td><td>all</td><td>Export formats</td></tr>
          </tbody>
        </table>
        <h2>Events</h2>
        <table class="api-table">
          <thead><tr><th>Event</th><th>Payload</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>update:modelValue</td><td>SequenceModel</td><td>Model changed (v-model)</td></tr>
            <tr><td>export</td><td>{ format, content }</td><td>User exported</td></tr>
          </tbody>
        </table>
      </section>

      <!-- FsdToolbar -->
      <section v-if="activeSection === 'toolbar'" class="doc-section">
        <h1>&lt;FsdToolbar&gt;</h1>
        <p>Standalone toolbar component for export/import operations.</p>
        <h2>Props</h2>
        <table class="api-table">
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>allowedExports</td><td>ExportFormat[]</td><td>all</td><td>Available exports</td></tr>
            <tr><td>allowImport</td><td>boolean</td><td>true</td><td>Show import</td></tr>
          </tbody>
        </table>
        <h2>Events</h2>
        <table class="api-table">
          <thead><tr><th>Event</th><th>Payload</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>exportRequest</td><td>ExportFormat</td><td>Export button clicked</td></tr>
            <tr><td>importRequest</td><td>void</td><td>Import button clicked</td></tr>
          </tbody>
        </table>
      </section>

      <!-- FsdStepEditor -->
      <section v-if="activeSection === 'step-editor'" class="doc-section">
        <h1>&lt;FsdStepEditor&gt;</h1>
        <p>Node property editing panel — displays fields for the selected node.</p>
        <h2>Props</h2>
        <table class="api-table">
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>nodeId</td><td>string</td><td>required</td><td>ID of node to edit</td></tr>
            <tr><td>model</td><td>DiagramModel</td><td>required</td><td>Current diagram model</td></tr>
            <tr><td>variant</td><td>string</td><td>undefined</td><td>Editor variant</td></tr>
            <tr><td>isDark</td><td>boolean</td><td>false</td><td>Dark mode flag</td></tr>
            <tr><td>themeColors</td><td>Partial&lt;ThemeColors&gt;</td><td>undefined</td><td>Color overrides</td></tr>
          </tbody>
        </table>
        <h2>Events</h2>
        <table class="api-table">
          <thead><tr><th>Event</th><th>Payload</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>update:model</td><td>DiagramModel</td><td>Model updated from property change</td></tr>
          </tbody>
        </table>
      </section>

      <!-- v-model -->
      <section v-if="activeSection === 'v-model'" class="doc-section">
        <h1>v-model Support</h1>
        <p>Both <code>&lt;FsdDiagram&gt;</code> and <code>&lt;FsdSequence&gt;</code> support Vue's v-model pattern:</p>
        <div class="code-block"><pre><code>&lt;!-- Two-way binding with v-model --&gt;
&lt;FsdDiagram v-model="diagramModel" variant="flowchart" /&gt;

&lt;!-- Equivalent long form --&gt;
&lt;FsdDiagram
  :model-value="diagramModel"
  @update:model-value="diagramModel = $event"
/&gt;</code></pre></div>
        <p>When the user edits the diagram, the component emits <code>update:modelValue</code> with the new model.
        Vue's reactivity system ensures your parent component stays in sync.</p>
      </section>

      <!-- Theming -->
      <section v-if="activeSection === 'theming'" class="doc-section">
        <h1>Theming</h1>
        <p>The editor supports three theme modes:</p>
        <ul>
          <li><strong>light</strong> — Always light background</li>
          <li><strong>dark</strong> — Always dark background</li>
          <li><strong>auto</strong> — Follows system preference (prefers-color-scheme)</li>
        </ul>
        <h2>Custom Colors</h2>
        <div class="code-block"><pre><code>&lt;FsdDiagram
  theme="dark"
  :theme-overrides="{
    canvasBg: '#1a1a2e',
    nodeBg: '#16213e',
    nodeBorder: '#42b883',
    accent: '#42b883',
    text: '#e0e0e0',
  }"
/&gt;</code></pre></div>
        <h2>ThemeColors Interface</h2>
        <table class="api-table">
          <thead><tr><th>Token</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>canvasBg</td><td>Canvas background color</td></tr>
            <tr><td>nodeBg</td><td>Node fill color</td></tr>
            <tr><td>nodeBorder</td><td>Node border color</td></tr>
            <tr><td>accent</td><td>Accent color (selections, handles)</td></tr>
            <tr><td>text</td><td>Text color</td></tr>
            <tr><td>edgeLine</td><td>Edge/connection line color</td></tr>
            <tr><td>gridLine</td><td>Grid line color</td></tr>
            <tr><td>selectionBg</td><td>Selection rectangle fill</td></tr>
          </tbody>
        </table>
      </section>

      <!-- Export & Import -->
      <section v-if="activeSection === 'export-import'" class="doc-section">
        <h1>Export &amp; Import</h1>
        <h2>Export Formats</h2>
        <table class="api-table">
          <thead><tr><th>Format</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>json</td><td>string</td><td>Full model as JSON (round-trip safe)</td></tr>
            <tr><td>mermaid</td><td>string</td><td>Mermaid syntax</td></tr>
            <tr><td>svg</td><td>string</td><td>SVG markup</td></tr>
            <tr><td>png</td><td>Blob</td><td>PNG image blob</td></tr>
          </tbody>
        </table>
        <h2>Handling Exports</h2>
        <div class="code-block"><pre><code>&lt;FsdDiagram
  v-model="model"
  :allowed-exports="['json', 'svg', 'png']"
  @export="handleExport"
/&gt;

&lt;script setup&gt;
function handleExport({ format, content }) {
  if (format === 'png') {
    const url = URL.createObjectURL(content);
    window.open(url);
  } else {
    console.log(format, content);
  }
}
&lt;/script&gt;</code></pre></div>
        <h2>Programmatic Import</h2>
        <div class="code-block"><pre><code>import { fromMermaid, fromJSON } from "flowchart-sequence-designer";

// From Mermaid syntax
const model = fromMermaid(`graph TD
  A[Start] --> B[Process]
  B --> C[End]`);

// From JSON
const saved = fromJSON(jsonString);</code></pre></div>
      </section>

      <!-- Composables -->
      <section v-if="activeSection === 'composables'" class="doc-section">
        <h1>Composables</h1>
        <h2>useReactBridge</h2>
        <p>The internal composable that powers all FSD components. You can use it to create custom wrappers:</p>
        <div class="code-block"><pre><code>import { ref, onMounted } from "vue";
import { useReactBridge } from "@flowchart-sequence-designer/vue";

const container = ref&lt;HTMLElement | null&gt;(null);

const { loading, error } = useReactBridge(
  container,
  () => ({ height: "100%", theme: "dark" }),
  () => import("flowchart-sequence-designer/ui").then(m => m.DiagramEditor),
);</code></pre></div>
        <h3>Parameters</h3>
        <table class="api-table">
          <thead><tr><th>Param</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>containerRef</td><td>Ref&lt;HTMLElement | null&gt;</td><td>Template ref for mount target</td></tr>
            <tr><td>getProps</td><td>() =&gt; P</td><td>Function returning React props (watched)</td></tr>
            <tr><td>componentImport</td><td>() =&gt; Promise&lt;Component&gt;</td><td>Dynamic import for the React component</td></tr>
          </tbody>
        </table>
        <h3>Returns</h3>
        <table class="api-table">
          <thead><tr><th>Property</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>loading</td><td>Ref&lt;boolean&gt;</td><td>True while editor is loading</td></tr>
            <tr><td>error</td><td>Ref&lt;string | null&gt;</td><td>Error message if load failed</td></tr>
            <tr><td>getBridge</td><td>() =&gt; ReactBridge | null</td><td>Access the underlying bridge</td></tr>
          </tbody>
        </table>
      </section>

      <!-- TypeScript -->
      <section v-if="activeSection === 'typescript'" class="doc-section">
        <h1>TypeScript</h1>
        <p>All components and composables are fully typed. Import types from the core package:</p>
        <div class="code-block"><pre><code>import type {
  DiagramModel,
  SequenceModel,
  ExportFormat,
} from "flowchart-sequence-designer";

import type {
  DiagramEditorProps,
  SequenceEditorProps,
  ThemeColors,
} from "flowchart-sequence-designer/ui";

import type { FsdDiagram, FsdSequence } from "@flowchart-sequence-designer/vue";</code></pre></div>
      </section>

      <!-- Architecture -->
      <section v-if="activeSection === 'architecture'" class="doc-section">
        <h1>Architecture</h1>
        <p>This package uses a <strong>React Bridge</strong> pattern to embed React components inside Vue:</p>
        <ol>
          <li>Each Vue component renders a plain <code>&lt;div ref&gt;</code> as a mount point</li>
          <li>On <code>onMounted</code>, the React editor is dynamically imported (code-split)</li>
          <li>A <code>ReactBridge</code> instance creates a React root inside the div</li>
          <li>Vue props are converted to React props and passed to the bridge</li>
          <li>React callbacks (onChange, onExport) call Vue's <code>emit()</code> directly</li>
          <li>On <code>onUnmounted</code>, the React root is cleanly destroyed</li>
        </ol>
        <p>This approach means:</p>
        <ul>
          <li>✅ No Vue-React interop library needed</li>
          <li>✅ React renders are isolated — they don't trigger Vue reactivity</li>
          <li>✅ The editor loads lazily (only when mounted)</li>
          <li>✅ Clean unmount prevents memory leaks</li>
        </ul>
      </section>

      <!-- Keyboard Shortcuts -->
      <section v-if="activeSection === 'keyboard'" class="doc-section">
        <h1>Keyboard Shortcuts</h1>
        <table class="api-table">
          <thead><tr><th>Shortcut</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Ctrl+Z / ⌘Z</td><td>Undo</td></tr>
            <tr><td>Ctrl+Y / ⌘⇧Z</td><td>Redo</td></tr>
            <tr><td>Ctrl+A / ⌘A</td><td>Select all</td></tr>
            <tr><td>Delete / Backspace</td><td>Delete selected</td></tr>
            <tr><td>Ctrl+C / ⌘C</td><td>Copy</td></tr>
            <tr><td>Ctrl+V / ⌘V</td><td>Paste</td></tr>
            <tr><td>Ctrl+D / ⌘D</td><td>Duplicate</td></tr>
            <tr><td>Escape</td><td>Deselect / Cancel</td></tr>
            <tr><td>+/-</td><td>Zoom in/out</td></tr>
            <tr><td>Ctrl+0 / ⌘0</td><td>Reset zoom</td></tr>
            <tr><td>Space + Drag</td><td>Pan canvas</td></tr>
          </tbody>
        </table>
      </section>

      <!-- Accessibility -->
      <section v-if="activeSection === 'accessibility'" class="doc-section">
        <h1>Accessibility &amp; Touch</h1>
        <ul>
          <li>Full keyboard navigation (Tab through nodes, Enter to select)</li>
          <li>ARIA labels on interactive elements</li>
          <li>Touch gestures: pinch-to-zoom, two-finger pan</li>
          <li>High contrast mode compatible</li>
          <li>Screen reader announcements for state changes</li>
        </ul>
      </section>

      <!-- Supported Frameworks -->
      <section v-if="activeSection === 'frameworks'" class="doc-section">
        <h1>Supported Frameworks</h1>
        <div class="framework-pills">
          <a href="https://ag-gr-hub.github.io/flowchart-sequence-designer/" target="_blank" class="pill pill-react">
            ⚛️ React (Core)
          </a>
          <a href="https://ag-gr-hub.github.io/flowchart-sequence-designer-angular/" target="_blank" class="pill pill-angular">
            🅰️ Angular
          </a>
          <span class="pill pill-vue active">
            💚 Vue (You are here)
          </span>
        </div>
      </section>

      <!-- Troubleshooting -->
      <section v-if="activeSection === 'troubleshooting'" class="doc-section">
        <h1>Troubleshooting</h1>
        <h2>"Invalid hook call" error</h2>
        <p>This means multiple React instances. Fix with Vite's <code>resolve.dedupe</code>:</p>
        <div class="code-block"><pre><code>// vite.config.ts
export default defineConfig({
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});</code></pre></div>
        <h2>Editor not rendering</h2>
        <ul>
          <li>Check that all peer dependencies are installed</li>
          <li>Ensure the container has a non-zero height</li>
          <li>Check browser console for import errors</li>
        </ul>
        <h2>TypeScript errors</h2>
        <p>Ensure <code>moduleResolution</code> is set to <code>"bundler"</code> or <code>"node16"</code> in your tsconfig.</p>
      </section>

      <!-- Changelog -->
      <section v-if="activeSection === 'changelog'" class="doc-section">
        <h1>Changelog</h1>
        <h2>0.1.0 — Initial Release</h2>
        <ul>
          <li>FsdDiagram, FsdSequence, FsdToolbar, FsdStepEditor components</li>
          <li>Full v-model support</li>
          <li>TypeScript definitions</li>
          <li>Lazy-loaded React bridge</li>
          <li>Light/dark/auto theming</li>
          <li>Comprehensive documentation</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
.docs-layout {
  display: flex;
  height: calc(100vh - 52px);
  overflow: hidden;
}

.sidebar {
  width: 220px;
  background: #0f1a2e;
  border-right: 1px solid #1a3050;
  overflow-y: auto;
  padding: 12px 0;
  flex-shrink: 0;
}

.sidebar-btn {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: #aaa;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
}

.sidebar-btn:hover {
  color: #fff;
  background: rgba(66, 184, 131, 0.08);
}

.sidebar-btn.active {
  color: #42b883;
  background: rgba(66, 184, 131, 0.12);
  border-left: 3px solid #42b883;
}

.docs-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 48px;
  max-width: 900px;
}

.doc-section h1 {
  font-size: 28px;
  margin-bottom: 16px;
  color: #fff;
}

.doc-section h2 {
  font-size: 20px;
  margin: 24px 0 12px;
  color: #ddd;
}

.doc-section h3 {
  font-size: 16px;
  margin: 16px 0 8px;
  color: #ccc;
}

.doc-section p {
  line-height: 1.7;
  margin-bottom: 12px;
  color: #bbb;
}

.doc-section ul, .doc-section ol {
  margin: 8px 0 16px 24px;
  color: #bbb;
  line-height: 1.8;
}

.doc-section code {
  background: #1e2d45;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: #42b883;
}

.code-block {
  background: #0d1b2a;
  border: 1px solid #1a3050;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  background: transparent;
  padding: 0;
  color: #e0e0e0;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre;
  display: block;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 13px;
}

.api-table th {
  background: #1a2840;
  padding: 10px 12px;
  text-align: left;
  color: #42b883;
  border-bottom: 2px solid #2a4060;
}

.api-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #1a3050;
  color: #ccc;
}

.api-table tr:hover td {
  background: rgba(66, 184, 131, 0.04);
}

.note {
  background: rgba(66, 184, 131, 0.08);
  border-left: 3px solid #42b883;
  padding: 12px 16px;
  border-radius: 0 8px 8px 0;
  margin: 12px 0;
}

.framework-pills {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  flex-wrap: wrap;
}

.pill {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid #333;
  color: #ccc;
  transition: all 0.15s;
}

.pill:hover {
  transform: translateY(-1px);
}

.pill-react { border-color: #61dafb; }
.pill-react:hover { background: rgba(97, 218, 251, 0.1); color: #61dafb; }
.pill-angular { border-color: #dd0031; }
.pill-angular:hover { background: rgba(221, 0, 49, 0.1); color: #dd0031; }
.pill-vue.active { border-color: #42b883; background: rgba(66, 184, 131, 0.15); color: #42b883; }

a {
  color: #42b883;
}
</style>
