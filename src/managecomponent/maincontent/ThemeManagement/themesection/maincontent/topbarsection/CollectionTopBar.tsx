import { For } from "solid-js";
import { useThemeContext } from "../../../../../../contexts/ThemeContext";

export default function CollectionTopBar() {
  const {
    filterCategory,
    setFilterCategory,
    filterSearch,
    setFilterSearch,
    themes,
    activeSection,
  } = useThemeContext();

  // Only render if activeSection is ''
  if (activeSection() !== "") return null;

  // Collect all unique categories
  const allCategories = Array.from(new Set(themes().flatMap(t => t.categories)));

  return (
    <div class="flex items-center gap-2 mb-4">
      <input
        class="border rounded px-2 py-1 flex-1"
        placeholder="Search themes..."
        value={filterSearch()}
        onInput={e => setFilterSearch((e.target as HTMLInputElement).value)}
      />
      <select
        class="border rounded px-2 py-1"
        value={filterCategory()}
        onChange={e => setFilterCategory((e.target as HTMLSelectElement).value)}
      >
        <option value="">All Categories</option>
        <For each={allCategories}>
          {cat => <option value={cat}>{cat}</option>}
        </For>
      </select>
    </div>
  );
}
