<script setup lang="ts">
</script>

<template>
  <main class="docs-page">
    <div class="docs-sidebar">
      <div class="sidebar-heading">Documentation</div>
      <a href="#install">Install</a>
      <a href="#quick-start">Quick Start</a>
      <div class="sidebar-group">Diagram Guides</div>
      <a href="#flowchart-guide">Flowchart</a>
      <a href="#question-guide">Question</a>
      <a href="#journey-guide">Journey</a>
      <a href="#sequence-guide">Sequence</a>
      <div class="sidebar-group">Builder APIs</div>
      <a href="#flowchart-api">flowchart()</a>
      <a href="#sequence-api">sequence()</a>
      <a href="#model-api">Model (low-level)</a>
      <div class="sidebar-group">Reference</div>
      <a href="#import">Import</a>
      <a href="#export">Export formats</a>
      <a href="#presets">Presets</a>
      <a href="#vue-ui">Vue UI</a>
      <a href="#editor-features">Editor features</a>
      <a href="#theming">Theming</a>
      <a href="#a11y">Accessibility &amp; touch</a>
      <a href="#shortcuts">Keyboard shortcuts</a>
      <a href="#inputs">Component props</a>
      <a href="#types">TypeScript Types</a>
      <div class="sidebar-divider"></div>
      <a href="https://ag-gr-hub.github.io/flowchart-sequence-designer/" target="_blank">↗ React Version</a>
      <a href="https://ag-gr-hub.github.io/flowchart-sequence-designer-angular/" target="_blank">↗ Angular Version</a>
      <a href="https://github.com/ag-gr-hub/flowchart-sequence-designer-vue" target="_blank">↗ GitHub</a>
      <a href="https://www.npmjs.com/package/@flowchart-sequence-designer/vue" target="_blank">↗ npm</a>
    </div>
    <div class="docs-content">
      <!-- Supported Frameworks -->
      <div class="frameworks-box">
        <div class="frameworks-label">Supported Frameworks</div>
        <div class="frameworks-pills">
          <a href="https://ag-gr-hub.github.io/flowchart-sequence-designer/" class="fw-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="2"/></svg>
            React
          </a>
          <a href="https://ag-gr-hub.github.io/flowchart-sequence-designer-angular/" class="fw-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l1.63 14.27L12 22l8.37-3.73L22 7L12 2zm0 2.21l6.9 3.33-.98 8.56L12 19.77l-5.92-3.67-.98-8.56L12 4.21z"/></svg>
            Angular
          </a>
          <a href="https://ag-gr-hub.github.io/flowchart-sequence-designer-vue/" class="fw-pill fw-active">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none"><path d="M2 4l14 24L30 4h-5.5L16 18.5 7.5 4H2z" fill="#42b883"/><path d="M7.5 4L16 18.5 24.5 4h-5L16 11 12.5 4h-5z" fill="#35495e"/></svg>
            Vue (current)
          </a>
        </div>
      </div>

      <!-- Hero -->
      <h1 class="docs-title">@flowchart-sequence-designer/vue</h1>
      <p class="docs-subtitle">Vue 3 wrapper components for the flowchart-sequence-designer library. Provides native Vue components with full v-model binding for diagram and sequence editors.</p>

      <!-- Install -->
      <section id="install">
        <h2>Install</h2>
        <div class="code-block"><code>npm install @flowchart-sequence-designer/vue flowchart-sequence-designer react react-dom</code></div>
        <p class="docs-note">Peer dependencies: Vue 3.3+, flowchart-sequence-designer, react, react-dom. The core API has zero runtime dependencies.</p>
        <p>Four diagram types ship in one package — pick the one that fits the story you're telling. Each gets its own deep-dive guide below.</p>
      </section>

      <!-- Quick Start -->
      <section id="quick-start">
        <h2>Quick Start</h2>
        <div class="code-block"><code><span class="kw">import</span> { ref } <span class="kw">from</span> <span class="str">'vue'</span>;
<span class="kw">import</span> { FsdDiagram } <span class="kw">from</span> <span class="str">'@flowchart-sequence-designer/vue'</span>;
<span class="kw">import type</span> { DiagramModel } <span class="kw">from</span> <span class="str">'flowchart-sequence-designer'</span>;

<span class="kw">const</span> model = ref&lt;DiagramModel | undefined&gt;();

&lt;template&gt;
  &lt;FsdDiagram
    v-model="model"
    variant="flowchart"
    height="600"
    theme="auto"
  /&gt;
&lt;/template&gt;</code></div>
        <p>That's it — no provider, no theme setup, no required props. The editor mounts with a sample diagram, a working toolbar, undo/redo, drag-to-pan, scroll-to-zoom, and export buttons.</p>
      </section>

      <!-- Diagram Guides -->
      <section id="flowchart-guide">
        <h2>Flowchart</h2>
        <p>General purpose — any shapes, freeform connections. Use this variant for process diagrams, decision trees, system architectures, or any graph where nodes connect freely. Supports rectangle, diamond, circle, and parallelogram shapes.</p>
        <div class="code-block"><code>&lt;FsdDiagram variant="flowchart" /&gt;</code></div>
      </section>

      <section id="question-guide">
        <h2>Question Flow</h2>
        <p>Each node is a question with lettered answer options (A, B, C…). Each answer has its own connection port, so you can route specific answers to specific nodes. Perfect for surveys, quizzes, decision wizards, and branching logic.</p>
        <div class="code-block"><code>&lt;FsdDiagram variant="question" /&gt;</code></div>
      </section>

      <section id="journey-guide">
        <h2>Journey Map</h2>
        <p>Numbered milestone steps — user path or process walkthrough. Nodes are auto-numbered and connected in sequence. Great for user journeys, onboarding flows, and step-by-step processes.</p>
        <div class="code-block"><code>&lt;FsdDiagram variant="journey" /&gt;</code></div>
      </section>

      <section id="sequence-guide">
        <h2>Sequence Diagram</h2>
        <p>Actor lifelines with ordered messages between them. Actors are displayed as columns with messages drawn as arrows between lifelines. Supports solid and dashed message styles. Drag message rows to reorder, drag actor columns to rearrange lifelines.</p>
        <div class="code-block"><code>&lt;FsdSequence theme="auto" @update:model-value="onModelChange" /&gt;</code></div>
      </section>

      <!-- Builder APIs -->
      <section id="flowchart-api">
        <h2>flowchart() — builder reference</h2>
        <p>Build a diagram with a fluent chainable API. Nodes and edges are validated at call time.</p>
        <div class="code-block"><code><span class="kw">import</span> { flowchart } <span class="kw">from</span> <span class="str">'flowchart-sequence-designer'</span>;

<span class="kw">const</span> diagram = flowchart(<span class="str">'Order Flow'</span>)
  .node(<span class="str">'start'</span>,   <span class="str">'Start'</span>,          { shape: <span class="str">'circle'</span> })
  .node(<span class="str">'check'</span>,   <span class="str">'Payment valid?'</span>, { shape: <span class="str">'diamond'</span> })
  .node(<span class="str">'success'</span>, <span class="str">'Confirm order'</span>,  { shape: <span class="str">'rectangle'</span> })
  .node(<span class="str">'fail'</span>,    <span class="str">'Reject'</span>,         { shape: <span class="str">'rectangle'</span> })
  .edge(<span class="str">'start'</span>,   <span class="str">'check'</span>)
  .edge(<span class="str">'check'</span>,   <span class="str">'success'</span>, { label: <span class="str">'Yes'</span> })
  .edge(<span class="str">'check'</span>,   <span class="str">'fail'</span>,    { label: <span class="str">'No'</span> });

console.log(diagram.toMermaid());</code></div>

        <h3>Node shapes</h3>
        <table class="props-table">
          <tr><th>Shape</th><th>Description</th></tr>
          <tr><td><code>rectangle</code></td><td>Standard process box (default)</td></tr>
          <tr><td><code>diamond</code></td><td>Decision / branch</td></tr>
          <tr><td><code>circle</code></td><td>Start or end terminal</td></tr>
          <tr><td><code>parallelogram</code></td><td>Input / output</td></tr>
        </table>

        <h3>Edge options</h3>
        <div class="code-block"><code>.edge(from, to, {
  label?: <span class="kw">string</span>,
  style?: <span class="str">'solid'</span> | <span class="str">'dashed'</span> | <span class="str">'dotted'</span>,
  arrowhead?: <span class="str">'arrow'</span> | <span class="str">'open'</span> | <span class="str">'none'</span>,
})</code></div>
      </section>

      <section id="sequence-api">
        <h2>sequence() — builder reference</h2>
        <p>Model actor-to-actor message flows. Actors auto-register from <code>.message()</code> calls — you can skip <code>.actor()</code> if you prefer.</p>
        <div class="code-block"><code><span class="kw">import</span> { sequence } <span class="kw">from</span> <span class="str">'flowchart-sequence-designer'</span>;

<span class="kw">const</span> diagram = sequence(<span class="str">'Auth Flow'</span>)
  .actor(<span class="str">'User'</span>)
  .actor(<span class="str">'Server'</span>)
  .message(<span class="str">'User'</span>,   <span class="str">'Server'</span>, <span class="str">'POST /login'</span>)
  .message(<span class="str">'Server'</span>, <span class="str">'User'</span>,   <span class="str">'200 OK + token'</span>, { style: <span class="str">'dashed'</span> });

console.log(diagram.toMermaid());</code></div>
      </section>

      <section id="model-api">
        <h2>Model — low-level API</h2>
        <p>Work directly with the mutable graph model when you need fine-grained control — useful for incremental updates or building on top of the library.</p>
        <div class="code-block"><code><span class="kw">import</span> { Model } <span class="kw">from</span> <span class="str">'flowchart-sequence-designer'</span>;
<span class="kw">import type</span> { DiagramModel } <span class="kw">from</span> <span class="str">'flowchart-sequence-designer'</span>;

<span class="kw">const</span> m = <span class="kw">new</span> Model({ type: <span class="str">'flowchart'</span>, nodes: [], edges: [] });
m.addNode({ id: <span class="str">'a'</span>, label: <span class="str">'Step A'</span>, shape: <span class="str">'rectangle'</span> });
m.addNode({ id: <span class="str">'b'</span>, label: <span class="str">'Step B'</span>, shape: <span class="str">'rectangle'</span> });
m.addEdge({ id: <span class="str">'e1'</span>, from: <span class="str">'a'</span>, to: <span class="str">'b'</span>, label: <span class="str">'next'</span> });

console.log(m.toMermaid());</code></div>
      </section>

      <!-- Import -->
      <section id="import">
        <h2>Import</h2>
        <p>Parse existing Mermaid or JSON into a live model. Round-trip fidelity is guaranteed: <code>fromMermaid(diagram.toMermaid())</code> produces an equivalent model. The editor's Import button opens a modal with paste + file upload that calls these under the hood.</p>
        <div class="code-block"><code><span class="kw">import</span> { fromMermaid, fromJSON } <span class="kw">from</span> <span class="str">'flowchart-sequence-designer'</span>;

<span class="kw">const</span> model = fromMermaid(<span class="str">'graph TD; A--&gt;B; B--&gt;C'</span>);
<span class="kw">const</span> model2 = fromJSON(jsonString);</code></div>
        <p>Feed imported models directly into the Vue component:</p>
        <div class="code-block"><code>&lt;FsdDiagram :model-value="importedModel" /&gt;</code></div>
      </section>

      <!-- Export formats -->
      <section id="export">
        <h2>Export formats</h2>
        <p>Every builder exposes the same export methods. <code>toPNG()</code> is browser-only (uses the Canvas API).</p>
        <div class="code-block"><code>diagram.toMermaid()   <span class="kw">// → string</span>
diagram.toPlantUML()  <span class="kw">// → string</span>
diagram.toJSON()      <span class="kw">// → string (serialised DiagramModel)</span>
diagram.toSVG()       <span class="kw">// → string (SVG markup)</span>
diagram.toPNG()       <span class="kw">// → Promise&lt;Blob&gt; (browser only)</span></code></div>

        <h3>Round-trip rules</h3>
        <p>The five formats trade fidelity for portability. Use this table to pick the one that matches what you need.</p>
        <table class="props-table">
          <tr><th>Format</th><th>Round-trip</th><th>Preserved</th><th>Dropped</th></tr>
          <tr><td><code>JSON</code></td><td>✅ full</td><td>every field — variant, metadata, waypoint, x/y, arrowheads, message order</td><td>nothing</td></tr>
          <tr><td><code>Mermaid (flowchart)</code></td><td>partial</td><td>shapes, labels, connectors, edge labels, subgraph → metadata.group</td><td>positions, waypoint, metadata.answers, variant. Dotted collapses to dashed.</td></tr>
          <tr><td><code>Mermaid (sequence)</code></td><td>partial</td><td>actor order, message arrows, labels</td><td>message metadata, styling overrides</td></tr>
          <tr><td><code>PlantUML (flowchart)</code></td><td>export-only</td><td>edge styles, labels, node ids</td><td>shape distinctions, positions, metadata, variant</td></tr>
          <tr><td><code>PlantUML (sequence)</code></td><td>export-only</td><td>actor order, message style, labels</td><td>—</td></tr>
          <tr><td><code>SVG</code></td><td>export-only (rendered)</td><td>full visual parity with the canvas</td><td>—</td></tr>
          <tr><td><code>PNG</code></td><td>export-only (browser-only)</td><td>same as SVG, rasterized at devicePixelRatio</td><td>—</td></tr>
        </table>
        <p>If you need 100% fidelity, use JSON. If you need a format GitHub renders inline in markdown, use Mermaid. If you need a polished image for docs, use SVG or PNG.</p>
      </section>

      <!-- Presets -->
      <section id="presets">
        <h2>Presets &amp; empty models</h2>
        <p>The editor mounts with a real working diagram so consumers immediately see styled nodes and edges. Reach for <code>emptyModel(type)</code> to start blank, or call a <code>preset*Model()</code> helper from your own code to hydrate the same example data.</p>
        <div class="code-block"><code><span class="kw">import</span> {
  presetFlowchartModel,
  presetSequenceModel,
  emptyModel,
} <span class="kw">from</span> <span class="str">'flowchart-sequence-designer/ui'</span>;

presetFlowchartModel(<span class="str">'flowchart'</span>)  <span class="kw">// 6-node order flow with one decision</span>
presetFlowchartModel(<span class="str">'question'</span>)   <span class="kw">// 1-question / 3-answer router</span>
presetFlowchartModel(<span class="str">'journey'</span>)    <span class="kw">// 5-step onboarding sequence</span>
presetSequenceModel()              <span class="kw">// 3-actor login handshake</span>

emptyModel(<span class="str">'flowchart'</span>)            <span class="kw">// blank flowchart</span>
emptyModel(<span class="str">'flowchart'</span>, <span class="str">'journey'</span>) <span class="kw">// blank journey-variant flowchart</span>
emptyModel(<span class="str">'sequence'</span>)             <span class="kw">// blank sequence diagram</span></code></div>
        <p>All presets return a deep clone — mutate the result freely without affecting future calls.</p>
      </section>

      <!-- Vue UI component -->
      <section id="vue-ui">
        <h2>Vue UI component</h2>
        <p>Import from <code>@flowchart-sequence-designer/vue</code>. The component is a self-contained SVG canvas — no additional CSS import needed.</p>
        <div class="code-block"><code><span class="kw">import</span> { FsdDiagram } <span class="kw">from</span> <span class="str">'@flowchart-sequence-designer/vue'</span>;

<span class="kw">// Drop it anywhere — works with zero config</span>
&lt;FsdDiagram /&gt;

<span class="kw">// Pre-load a model and listen for changes</span>
&lt;FsdDiagram v-model="model" /&gt;

<span class="kw">// Full control</span>
&lt;FsdDiagram
  v-model="model"
  @export="handleExport"
  height="100%"
  variant="question"
  theme="dark"
  :allowed-exports="['json', 'svg']"
  :allow-import="false"
/&gt;</code></div>

        <h3>Variants</h3>
        <table class="props-table">
          <tr><th>Variant</th><th>Description</th></tr>
          <tr><td><code>flowchart</code></td><td>General purpose — any shapes, freeform connections</td></tr>
          <tr><td><code>question</code></td><td>Each node is a question with lettered answer cards, each with its own connection port</td></tr>
          <tr><td><code>journey</code></td><td>Numbered milestone steps — user path or process walkthrough</td></tr>
        </table>
      </section>

      <!-- Editor features -->
      <section id="editor-features">
        <h2>Editor features</h2>

        <h3>Canvas</h3>
        <p>Drag nodes to reposition (snaps to 24px grid). Scroll to zoom in/out (pinch to zoom on touch). Drag the canvas background to pan. Double-click a node to rename it inline. Dashed alignment guides appear when a dragged node lines up with a sibling. Bottom-right minimap for quick viewport navigation.</p>

        <h3>Connecting nodes</h3>
        <p>Hover a node to reveal the bottom port dot, then drag it to another node. In the Question variant, each answer row has its own port dot — drag it to route that answer to a specific node.</p>

        <h3>Node Navigator (left panel)</h3>
        <p>Lists all nodes with shape badge, label, and connection counts. Search/filter by name. Click any row to jump to that node and center the canvas on it. Collapses to a slim icon strip.</p>

        <h3>Step Editor (right panel)</h3>
        <p>Appears when a node is selected. Edit the node name, change its shape. Manage branches / answer options (add, remove, reorder). Question variant shows connection status per answer.</p>

        <h3>Context menu (right-click)</h3>
        <table class="props-table">
          <tr><th>Target</th><th>Actions</th></tr>
          <tr><td>Canvas</td><td>Add node at cursor, Re-center, Undo, Redo</td></tr>
          <tr><td>Node</td><td>Rename, Duplicate, Disconnect all edges, Delete</td></tr>
          <tr><td>Edge</td><td>Style (solid/dashed/dotted), Arrowhead, Reset routing, Delete</td></tr>
          <tr><td>Touch</td><td>Long-press (~550ms) opens the canvas menu</td></tr>
        </table>
      </section>

      <!-- Theming -->
      <section id="theming">
        <h2>Theming</h2>
        <p>The editor ships with a slate-based light/dark palette and follows the OS preference by default. To brand-match without forking, pass <code>:theme-overrides</code> — a <code>Partial&lt;ThemeColors&gt;</code> shallow-merged on top of the resolved palette.</p>
        <div class="code-block"><code><span class="kw">import</span> { ref } <span class="kw">from</span> <span class="str">'vue'</span>;
<span class="kw">import</span> { FsdDiagram } <span class="kw">from</span> <span class="str">'@flowchart-sequence-designer/vue'</span>;
<span class="kw">import type</span> { ThemeColors } <span class="kw">from</span> <span class="str">'flowchart-sequence-designer/ui'</span>;

<span class="kw">const</span> brand: Partial&lt;ThemeColors&gt; = {
  canvas: <span class="str">'#0b1020'</span>,
  nodeFill: <span class="str">'#111a2e'</span>,
  nodeStroke: <span class="str">'#2b3a5a'</span>,
  nodeSelectedFill: <span class="str">'#1a2447'</span>,
  edgeColor: <span class="str">'#7b8aa6'</span>,
  textPrimary: <span class="str">'#e6edf7'</span>,
};

&lt;FsdDiagram theme="dark" :theme-overrides="brand" /&gt;</code></div>

        <h3>ThemeColors tokens (flowchart)</h3>
        <table class="props-table">
          <tr><th>Token group</th><th>Members</th><th>Where it shows up</th></tr>
          <tr><td>Canvas</td><td><code>canvas</code>, <code>dot</code></td><td>Background + dot grid</td></tr>
          <tr><td>Nodes</td><td><code>nodeFill</code>, <code>nodeStroke</code>, <code>nodeSelectedFill</code></td><td>Node body, border, selection tint</td></tr>
          <tr><td>Edges</td><td><code>edgeColor</code></td><td>Edge stroke + arrowhead</td></tr>
          <tr><td>Type ramp</td><td><code>textPrimary</code>, <code>textSecondary</code>, <code>textMuted</code></td><td>Labels, hints, secondary text</td></tr>
          <tr><td>Chrome — panel</td><td><code>panelBg</code>, <code>panelBorder</code></td><td>Side panel surface</td></tr>
          <tr><td>Chrome — controls</td><td><code>ctrlsBg</code>, <code>ctrlsBorder</code></td><td>Toolbar, zoom controls</td></tr>
          <tr><td>Chrome — input</td><td><code>inputBg</code>, <code>inputBorder</code>, <code>inputText</code></td><td>Form fields in the side panel</td></tr>
          <tr><td>Chrome — card</td><td><code>cardBg</code>, <code>cardBorder</code></td><td>Answer rows, branch rows</td></tr>
          <tr><td>Chrome — section</td><td><code>sectionBorder</code></td><td>Divider between panel sections</td></tr>
          <tr><td>Buttons</td><td><code>btnSecBg</code>, <code>btnSecText</code>, <code>shapeBtnBg</code>, <code>shapeBtnBorder</code></td><td>Secondary buttons, shape picker</td></tr>
          <tr><td>Accents</td><td><code>addFormBg</code>, <code>bannerBg</code>, <code>labelText</code>, <code>hintText</code>, <code>statusBg</code></td><td>Add-form backdrop, validation banner</td></tr>
        </table>

        <h3>SequenceThemeColors tokens (sequence)</h3>
        <p>The sequence editor accepts the same prop with a slightly different shape: <code>Partial&lt;SequenceThemeColors&gt;</code>. It drops node-specific tokens and adds <code>lifeline</code>, <code>arrow</code>, and <code>actorFill</code> / <code>actorStroke</code> / <code>actorText</code> for the swim-lane elements.</p>
      </section>

      <!-- Accessibility & touch -->
      <section id="a11y">
        <h2>Accessibility &amp; touch</h2>
        <p>The editor is keyboard-first and screen-reader-aware. Every interaction reachable by mouse has a keyboard equivalent; every state change announces via a polite <code>aria-live</code> region.</p>

        <h3>Keyboard navigation</h3>
        <p>Every node, port, and toolbar control is reachable with Tab; selection moves with Arrow keys (1 grid unit, or 4 with Shift); Alt+Arrow traverses the graph to the nearest connected neighbor in that direction. The focus ring is visible at all times.</p>

        <h3>ARIA roles</h3>
        <p>The canvas is an <code>application</code> region with an <code>aria-label</code>; selection, add, and delete actions update an <code>aria-live="polite"</code> status region. The toolbar uses native button elements with explicit labels.</p>

        <h3>Reduced motion</h3>
        <p>The animated edge-flow dash honours <code>prefers-reduced-motion</code> — when set, the dash freezes and the canvas renders with no animation.</p>

        <h3>Touch interactions</h3>
        <table class="props-table">
          <tr><th>Action</th><th>Gesture</th></tr>
          <tr><td>Pan</td><td>One-finger drag on the canvas background</td></tr>
          <tr><td>Zoom</td><td>Two-finger pinch</td></tr>
          <tr><td>Context menu</td><td>Long-press (~550 ms) on the canvas or on a node</td></tr>
          <tr><td>Larger hit targets</td><td>Port circles auto-enlarge on coarse-pointer devices (24 px vs. 14 px)</td></tr>
          <tr><td>Drag node</td><td>Press and drag the node body. 8 px threshold lets you tap to select.</td></tr>
        </table>
      </section>

      <!-- Keyboard shortcuts -->
      <section id="shortcuts">
        <h2>Keyboard shortcuts</h2>
        <p>Every editor shortcut is keyboard-only — the same actions are also reachable via right-click menus and toolbar buttons.</p>
        <table class="props-table">
          <tr><th>Shortcut</th><th>Action</th></tr>
          <tr><td><code>Ctrl+Z</code></td><td>Undo</td></tr>
          <tr><td><code>Ctrl+Y</code> / <code>Ctrl+Shift+Z</code></td><td>Redo</td></tr>
          <tr><td><code>Ctrl+0</code></td><td>Fit all nodes in view</td></tr>
          <tr><td><code>Ctrl+C</code> / <code>Ctrl+V</code></td><td>Copy / paste selection (internal edges preserved, +24 px offset)</td></tr>
          <tr><td><code>Ctrl+D</code></td><td>Duplicate selection</td></tr>
          <tr><td><code>Delete</code> / <code>Backspace</code></td><td>Remove selection</td></tr>
          <tr><td><code>Escape</code></td><td>Deselect, cancel edge drag, close context menu</td></tr>
          <tr><td><code>Arrow keys</code></td><td>Nudge selection 1 grid unit (Shift = 4 units)</td></tr>
          <tr><td><code>Alt+Arrow</code></td><td>Traverse to nearest node in that direction</td></tr>
          <tr><td><code>Shift+click</code></td><td>Toggle a node in/out of selection</td></tr>
          <tr><td><code>Shift+drag</code> (canvas)</td><td>Box-select — adds intersected nodes to selection</td></tr>
          <tr><td>Double-click edge label</td><td>Rename edge label inline</td></tr>
          <tr><td>Drag edge midpoint</td><td>Route edge through a waypoint</td></tr>
        </table>
      </section>

      <!-- Component props -->
      <section id="inputs">
        <h2>Component props</h2>
        <h3>&lt;FsdDiagram&gt; Props</h3>
        <table class="props-table">
          <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
          <tr><td><code>modelValue</code></td><td>DiagramModel</td><td>preset</td><td>Pre-load a diagram model (v-model)</td></tr>
          <tr><td><code>height</code></td><td>string | number</td><td>'500px'</td><td>Any CSS height value</td></tr>
          <tr><td><code>variant</code></td><td>DiagramVariant</td><td>'flowchart'</td><td>'flowchart' | 'question' | 'journey'</td></tr>
          <tr><td><code>theme</code></td><td>string</td><td>'auto'</td><td>'light' | 'dark' | 'auto' (follows system)</td></tr>
          <tr><td><code>themeOverrides</code></td><td>Partial&lt;ThemeColors&gt;</td><td>—</td><td>Brand-match by overriding palette entries</td></tr>
          <tr><td><code>allowedExports</code></td><td>ExportFormat[]</td><td>all</td><td>Restrict visible export buttons</td></tr>
          <tr><td><code>allowImport</code></td><td>boolean</td><td>true</td><td>Show/hide the Import button</td></tr>
        </table>
        <h3>&lt;FsdDiagram&gt; Events</h3>
        <table class="props-table">
          <tr><th>Event</th><th>Payload</th><th>Description</th></tr>
          <tr><td><code>update:modelValue</code></td><td>DiagramModel</td><td>Fires on every node/edge mutation (v-model)</td></tr>
          <tr><td><code>export</code></td><td>{ format: ExportFormat, content: string | Blob }</td><td>Intercept exports instead of auto-downloading</td></tr>
        </table>

        <h3>&lt;FsdSequence&gt; Props</h3>
        <p>Same as <code>&lt;FsdDiagram&gt;</code> except no <code>variant</code> prop. Uses <code>Partial&lt;SequenceThemeColors&gt;</code> for themeOverrides.</p>
      </section>

      <!-- Types -->
      <section id="types">
        <h2>TypeScript Types</h2>
        <div class="code-block"><code><span class="kw">import type</span> {
  DiagramModel,
  DiagramNode,
  DiagramEdge,
  DiagramVariant,   <span class="kw">// 'flowchart' | 'question' | 'journey'</span>
  DiagramType,      <span class="kw">// 'flowchart' | 'sequence'</span>
  NodeShape,        <span class="kw">// 'rectangle' | 'diamond' | 'circle' | 'parallelogram'</span>
  ExportFormat,     <span class="kw">// 'mermaid' | 'plantuml' | 'json' | 'svg' | 'png'</span>
  SequenceMessage,
} <span class="kw">from</span> <span class="str">'flowchart-sequence-designer'</span>;

<span class="kw">import type</span> {
  ThemeColors,
  SequenceThemeColors,
} <span class="kw">from</span> <span class="str">'flowchart-sequence-designer/ui'</span>;</code></div>

        <h3>DiagramModel</h3>
        <div class="code-block"><code><span class="kw">interface</span> DiagramModel {
  type: <span class="str">'flowchart'</span> | <span class="str">'sequence'</span>;
  variant?: DiagramVariant;
  title?: <span class="kw">string</span>;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  actors?: <span class="kw">string</span>[];           <span class="kw">// sequence only</span>
  messages?: SequenceMessage[]; <span class="kw">// sequence only</span>
}</code></div>

        <h3>DiagramNode</h3>
        <div class="code-block"><code><span class="kw">interface</span> DiagramNode {
  id: <span class="kw">string</span>;
  label: <span class="kw">string</span>;
  shape?: NodeShape;
  x?: <span class="kw">number</span>;
  y?: <span class="kw">number</span>;
  metadata?: Record&lt;<span class="kw">string</span>, unknown&gt;;
  <span class="kw">// question variant: metadata.answers = string[]</span>
}</code></div>

        <h3>DiagramEdge</h3>
        <div class="code-block"><code><span class="kw">interface</span> DiagramEdge {
  id: <span class="kw">string</span>;
  from: <span class="kw">string</span>;
  to: <span class="kw">string</span>;
  label?: <span class="kw">string</span>;
  style?: <span class="str">'solid'</span> | <span class="str">'dashed'</span> | <span class="str">'dotted'</span>;
  arrowhead?: <span class="str">'arrow'</span> | <span class="str">'none'</span> | <span class="str">'open'</span>;
  waypoint?: { x: <span class="kw">number</span>; y: <span class="kw">number</span> };
}</code></div>

        <h3>SequenceMessage</h3>
        <div class="code-block"><code><span class="kw">interface</span> SequenceMessage {
  id: <span class="kw">string</span>;
  from: <span class="kw">string</span>;
  to: <span class="kw">string</span>;
  label: <span class="kw">string</span>;
  style?: <span class="str">'solid'</span> | <span class="str">'dashed'</span>;
}</code></div>
      </section>
    </div>
  </main>
</template>

<style>
/* ─── Docs page (matches React/Angular DocsPage) ─── */
.docs-page {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.docs-sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid #1e293b;
  overflow-y: auto;
  padding: 28px 0;
  background: #0d1421;
}
.sidebar-heading {
  padding: 0 16px 16px;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.sidebar-group {
  padding: 14px 16px 4px;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.docs-sidebar a {
  display: block;
  padding: 7px 20px;
  font-size: 13px;
  color: #64748b;
  text-decoration: none;
  border-left: 2px solid transparent;
}
.docs-sidebar a:hover { color: #cbd5e1; }
.sidebar-divider {
  height: 1px;
  background: #1e293b;
  margin: 16px;
}
.docs-content {
  flex: 1;
  overflow-y: auto;
  padding: 40px 56px 80px;
}
.frameworks-box {
  margin-bottom: 32px;
  padding: 16px 20px;
  background: #0d1421;
  border: 1px solid #1e293b;
  border-radius: 10px;
}
.frameworks-label {
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.frameworks-pills {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.fw-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
}
.fw-pill:hover { border-color: #4f46e5; color: #a5b4fc; }
.fw-active {
  background: rgba(66, 184, 131, 0.1);
  border-color: #42b883;
  color: #6ee7b7;
  font-weight: 600;
}
.docs-title {
  font-size: 28px;
  font-weight: 800;
  color: #f8fafc;
  margin: 0 0 10px;
}
.docs-subtitle {
  color: #64748b;
  font-size: 15px;
  line-height: 1.6;
  max-width: 600px;
  margin-bottom: 40px;
}
.docs-content section {
  margin-bottom: 40px;
}
.docs-content h2 {
  font-size: 20px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #1e293b;
}
.docs-content h3 {
  font-size: 15px;
  font-weight: 600;
  color: #cbd5e1;
  margin: 16px 0 8px;
}
.docs-content p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
}
.docs-note {
  font-size: 12px;
  color: #64748b;
  margin-top: 8px;
}
.code-block {
  background: #0d1421;
  border: 1px solid #1e293b;
  border-radius: 8px;
  padding: 16px 20px;
  overflow-x: auto;
  margin-bottom: 12px;
}
.code-block code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 13px;
  color: #e2e8f0;
  white-space: pre;
}
.kw { color: #c792ea; }
.str { color: #c3e88d; }
.props-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
  font-size: 13px;
}
.props-table th {
  text-align: left;
  padding: 8px 12px;
  background: #0d1421;
  color: #94a3b8;
  font-weight: 600;
  border-bottom: 1px solid #1e293b;
}
.props-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #1e293b;
  color: #cbd5e1;
}
.props-table code {
  background: rgba(66, 184, 131, 0.1);
  color: #6ee7b7;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}
</style>
