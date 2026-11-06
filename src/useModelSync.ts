import { ref, watch } from "vue";
import type { DiagramModel } from "flowchart-sequence-designer";

const serialize = (model: DiagramModel | undefined) => JSON.stringify(model);

/**
 * Tells the parent's model changes apart from the editor's own edits echoing
 * back through v-model.
 *
 * The core editor only reads `initialModel` on mount, so a parent's change has
 * to remount it: `revision` goes up, and is used as the React `key`. An echoed
 * edit must not remount, or every edit would lose selection and undo history.
 * Models are compared by content because a parent may clone before storing.
 */
export function useModelSync(getModel: () => DiagramModel | undefined) {
  const revision = ref(0);
  let known = serialize(getModel());

  watch(
    () => serialize(getModel()),
    (next) => {
      if (next === known) return;
      known = next;
      revision.value++;
    },
  );

  /** Records a model the editor produced, so its echo is not treated as new. */
  const noteEdit = (model: DiagramModel) => {
    known = serialize(model);
  };

  return { revision, noteEdit };
}
