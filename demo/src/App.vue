<script setup lang="ts">
import { ref, computed } from "vue";
import { FsdDiagram, FsdSequence } from "@flowchart-sequence-designer/vue";
import DocsTab from "./DocsTab.vue";

type Tab = "flowchart" | "question-flow" | "journey-map" | "sequence" | "docs";

const activeTab = ref<Tab>("flowchart");
const theme = ref<"light" | "dark" | "auto">("auto");

const editorHeight = computed(() => "calc(100vh - 52px)");

const tabs: { id: Tab; label: string }[] = [
  { id: "flowchart", label: "Flowchart" },
  { id: "question-flow", label: "Question Flow" },
  { id: "journey-map", label: "Journey Map" },
  { id: "sequence", label: "Sequence" },
  { id: "docs", label: "For Developers" },
];

function cycleTheme() {
  const order: ("light" | "dark" | "auto")[] = ["light", "dark", "auto"];
  const idx = order.indexOf(theme.value);
  theme.value = order[(idx + 1) % 3];
}

const themeIcon = computed(() => {
  if (theme.value === "light") return "☀️";
  if (theme.value === "dark") return "🌙";
  return "🖥️";
});
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <div class="brand">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="6" fill="#42b883" />
          <path d="M16 6L26 26H6L16 6Z" fill="white" opacity="0.9" />
          <path d="M16 12L22 24H10L16 12Z" fill="#42b883" />
        </svg>
        <span class="brand-text">FSD Vue</span>
      </div>
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      <button class="theme-toggle" @click="cycleTheme" :title="`Theme: ${theme}`">
        {{ themeIcon }}
      </button>
    </nav>

    <main class="content">
      <FsdDiagram
        v-if="activeTab === 'flowchart'"
        :height="editorHeight"
        variant="flowchart"
        :theme="theme"
      />
      <FsdDiagram
        v-if="activeTab === 'question-flow'"
        :height="editorHeight"
        variant="question-flow"
        :theme="theme"
      />
      <FsdDiagram
        v-if="activeTab === 'journey-map'"
        :height="editorHeight"
        variant="journey-map"
        :theme="theme"
      />
      <FsdSequence
        v-if="activeTab === 'sequence'"
        :height="editorHeight"
        :theme="theme"
      />
      <DocsTab v-if="activeTab === 'docs'" />
    </main>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #1a1a2e;
  color: #e0e0e0;
}

.navbar {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;
  background: #16213e;
  border-bottom: 1px solid #0f3460;
  gap: 16px;
  flex-shrink: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-text {
  font-weight: 700;
  font-size: 16px;
  color: #42b883;
}

.tabs {
  display: flex;
  gap: 4px;
  flex: 1;
}

.tab-btn {
  background: transparent;
  border: none;
  color: #aaa;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s;
}

.tab-btn:hover {
  color: #fff;
  background: rgba(66, 184, 131, 0.1);
}

.tab-btn.active {
  color: #fff;
  background: #42b883;
}

.theme-toggle {
  background: transparent;
  border: 1px solid #333;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 16px;
}

.content {
  flex: 1;
  overflow: hidden;
}
</style>
