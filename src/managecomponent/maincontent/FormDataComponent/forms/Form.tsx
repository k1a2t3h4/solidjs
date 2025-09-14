// src/components/forms/Form.tsx
import { type Component } from "solid-js";
import { useFormContext } from "../../../../contexts/FormDataContext";

export const Form: Component = () => {
  const { handleSave, canSave, handleBack, iframeEl } = useFormContext();

  return (
    <div class="p-4 space-y-4">
      <div class="flex items-center justify-between">
        <button
          class="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
          onClick={handleBack}
        >
          ⬅ Back
        </button>
      </div>

      <h2 class="text-lg font-semibold">📝 Create / Edit Form</h2>

      {/* Show iframe managed by context */}
      {iframeEl() && (
        <div class="relative">
          {iframeEl()}
        </div>
      )}

      <div class="flex gap-2">
        <button
          class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          disabled={!canSave()}
          onClick={handleSave}
        >
          💾 Save
        </button>
        
        <button
          class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          onClick={handleBack}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
