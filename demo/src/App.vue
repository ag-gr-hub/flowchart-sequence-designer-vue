<script setup lang="ts">
import { ref, computed } from "vue";
import { FsdDiagram, FsdSequence } from "@flowchart-sequence-designer/vue";
import DocsTab from "./DocsTab.vue";

type Tab = "flowchart" | "question" | "journey" | "sequence" | "docs";
type Theme = "light" | "dark" | "auto";

const tab = ref<Tab>("flowchart");
const theme = ref<Theme>("auto");
const themes: Theme[] = ["light", "auto", "dark"];

const editorHeight = computed(() => "100%");

const variant = computed(() => {
  if (tab.value === "flowchart") return "flowchart" as const;
  if (tab.value === "question") return "question" as const;
  if (tab.value === "journey") return "journey" as const;
  return "flowchart" as const;
});

function switchTab(t: Tab) {
  tab.value = t;
}
</script>

<template>
  <div class="app-root">
    <!-- Single top nav (mirrors React/Angular layout) -->
    <nav class="topnav" role="tablist" aria-label="Editor variants">
      <a class="brand" href="https://github.com/ag-gr-hub/flowchart-sequence-designer-vue" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
          <path d="M2 4l14 24L30 4h-5.5L16 18.5 7.5 4H2z" fill="#42b883"/>
          <path d="M7.5 4L16 18.5 24.5 4h-5L16 11 12.5 4h-5z" fill="#35495e"/>
        </svg>
        @flowchart-sequence-designer/vue
      </a>

      <button type="button" role="tab" :aria-selected="tab === 'flowchart'" :class="{ active: tab === 'flowchart' }" @click="switchTab('flowchart')">
        <span class="tab-label">Flowchart</span>
        <span class="tab-desc">General purpose — any shapes, any flow</span>
      </button>
      <button type="button" role="tab" :aria-selected="tab === 'question'" :class="{ active: tab === 'question' }" @click="switchTab('question')">
        <span class="tab-label">Question Flow</span>
        <span class="tab-desc">Each node is a question; answers are side-by-side</span>
      </button>
      <button type="button" role="tab" :aria-selected="tab === 'journey'" :class="{ active: tab === 'journey' }" @click="switchTab('journey')">
        <span class="tab-label">Journey Map</span>
        <span class="tab-desc">Numbered milestone steps</span>
      </button>
      <button type="button" role="tab" :aria-selected="tab === 'sequence'" :class="{ active: tab === 'sequence' }" @click="switchTab('sequence')">
        <span class="tab-label">Sequence</span>
        <span class="tab-desc">Actor lifelines + ordered messages</span>
      </button>
      <button type="button" role="tab" :aria-selected="tab === 'docs'" class="docs-tab" :class="{ active: tab === 'docs' }" @click="switchTab('docs')">
        <span class="tab-label">For Developers</span>
        <span class="tab-desc">API &amp; programmatic usage</span>
      </button>

      <div class="nav-spacer"></div>
      <div class="theme-toggle">
        <button
          v-for="t in themes"
          :key="t"
          type="button"
          :class="{ active: theme === t }"
          :aria-pressed="theme === t"
          @click="theme = t"
        >
          {{ t === 'light' ? '☀ Light' : t === 'dark' ? '☾ Dark' : '⊙ Auto' }}
        </button>
      </div>
    </nav>

    <!-- Content -->
    <DocsTab v-if="tab === 'docs'" />
    <FsdSequence
      v-else-if="tab === 'sequence'"
      :height="editorHeight"
      :theme="theme"
      :allow-import="true"
    />
    <FsdDiagram
      v-else
      :height="editorHeight"
      :variant="variant"
      :theme="theme"
      :allow-import="true"
    />
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

.app-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
  background: #0a0f1a;
  color: #e2e8f0;
  font-family: ui-sans-serif, system-ui, sans-serif;
}
.app-root > :last-child {
  flex: 1;
  min-height: 0;
}

/* ─── Single top nav bar (matches React/Angular) ─── */
.topnav {
  display: flex;
  gap: 0;
  background: #0f172a;
  padding: 0 16px;
  align-items: stretch;
  flex-shrink: 0;
  border-bottom: 1px solid #1e293b;
  overflow-x: auto;
  overflow-y: hidden;
}
.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 20px;
  color: #f1f5f9;
  font-size: 13px;
  font-weight: 700;
  border-right: 1px solid #1e293b;
  text-decoration: none;
  margin-right: 8px;
  white-space: nowrap;
}
.topnav > button {
  padding: 10px 18px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #64748b;
  font-size: 12px;
  font-weight: 400;
  font-family: ui-sans-serif, system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}
.topnav > button.active {
  border-bottom-color: #42b883;
  color: #f1f5f9;
  font-weight: 700;
}
.topnav > button:hover { color: #cbd5e1; }
.topnav > button.docs-tab.active {
  border-bottom-color: #10b981;
  color: #6ee7b7;
}
.tab-label { font-size: 12px; }
.tab-desc { font-size: 10px; opacity: 0.6; white-space: nowrap; }
.nav-spacer { flex: 1; }
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 4px;
}
.theme-toggle button {
  padding: 4px 10px;
  background: none;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #475569;
  font-size: 11px;
  font-weight: 400;
  font-family: ui-sans-serif, system-ui, sans-serif;
}
.theme-toggle button.active {
  background: rgba(66, 184, 131, 0.25);
  border-color: #42b883;
  color: #6ee7b7;
  font-weight: 600;
}

/* Focus styles */
button:focus-visible, a:focus-visible {
  outline: 2px solid #42b883;
  outline-offset: 2px;
}

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .topnav {
    flex-wrap: wrap;
    overflow-x: visible;
    overflow-y: visible;
  }
  .brand {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #1e293b;
    padding: 8px 16px;
    margin-right: 0;
  }
  .tab-desc {
    display: none;
  }
  .docs-sidebar {
    display: none;
  }
  .docs-content {
    padding: 20px 16px 60px !important;
  }
}
@media (max-width: 480px) {
  .topnav > button {
    padding: 8px 10px;
    font-size: 11px;
  }
}
</style>
