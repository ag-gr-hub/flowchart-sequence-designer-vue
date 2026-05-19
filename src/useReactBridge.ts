import { ref, onMounted, onUnmounted, watch, type Ref } from "vue";
import type { ComponentType } from "react";
import { ReactBridge } from "./react-bridge";

/**
 * Composable that manages the React bridge lifecycle for a Vue component.
 * Handles: dynamic import → mount → watch props → unmount.
 */
export function useReactBridge<P extends object>(
  containerRef: Ref<HTMLElement | null>,
  getProps: () => P,
  componentImport: () => Promise<ComponentType<P>>,
) {
  const loading = ref(true);
  const error = ref<string | null>(null);
  let bridge: ReactBridge<P> | null = null;

  onMounted(async () => {
    try {
      const Component = await componentImport();
      if (!containerRef.value) {
        error.value = "Container element not available";
        loading.value = false;
        return;
      }
      bridge = new ReactBridge<P>(Component, getProps());
      bridge.mount(containerRef.value);
      loading.value = false;
    } catch (err: unknown) {
      loading.value = false;
      error.value = `Failed to load editor: ${err instanceof Error ? err.message : String(err)}`;
    }
  });

  watch(getProps, (newProps) => {
    if (bridge) {
      bridge.update(newProps);
    }
  }, { deep: true });

  onUnmounted(() => {
    bridge?.unmount();
    bridge = null;
  });

  return { loading, error, getBridge: () => bridge };
}
