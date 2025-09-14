import { useThemeContext } from "../../../../../../contexts/ThemeContext";
import { For } from "solid-js";

export default function FilterSection() {
  const {
    filterCategory,
    setFilterCategory,
    filterSearch,
    setFilterSearch,
    filterTag,
    setFilterTag,
    filterMinPrice,
    setFilterMinPrice,
    filterMaxPrice,
    setFilterMaxPrice,
    filterSalesCount,
    setFilterSalesCount,
    filterImpression,
    setFilterImpression,
    filterCreated,
    setFilterCreated,
    filterVersion,
    setFilterVersion,
    themes
  } = useThemeContext();

  // Compute all unique categories, tags, versions
  const allCategories = Array.from(new Set(themes().flatMap(t => t.categories)));
  const allTags = Array.from(new Set(themes().flatMap(t => t.tags)));
  const allVersions = Array.from(new Set(themes().flatMap(t => t.versions)));

  return (
    <div class="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 class="font-semibold mb-3">Filters</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label class="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            class="w-full border rounded px-2 py-1 text-sm"
            placeholder="Search themes..."
            value={filterSearch()}
            onInput={e => setFilterSearch(e.currentTarget.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label class="block text-sm font-medium mb-1">Category</label>
          <select
            class="w-full border rounded px-2 py-1 text-sm"
            value={filterCategory()}
            onChange={e => setFilterCategory(e.currentTarget.value)}
          >
            <option value="">All Categories</option>
            <For each={allCategories}>{cat => <option value={cat}>{cat}</option>}</For>
          </select>
        </div>

        {/* Tag */}
        <div>
          <label class="block text-sm font-medium mb-1">Tag</label>
          <select
            class="w-full border rounded px-2 py-1 text-sm"
            value={filterTag()}
            onChange={e => setFilterTag(e.currentTarget.value)}
          >
            <option value="">All Tags</option>
            <For each={allTags}>{tag => <option value={tag}>{tag}</option>}</For>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <label class="block text-sm font-medium mb-1">Min Price</label>
          <input
            type="number"
            class="w-full border rounded px-2 py-1 text-sm"
            placeholder="Min price"
            value={filterMinPrice() ?? ""}
            onInput={e =>
              setFilterMinPrice(e.currentTarget.value ? Number(e.currentTarget.value) : null)
            }
          />
        </div>

        {/* Max Price */}
        <div>
          <label class="block text-sm font-medium mb-1">Max Price</label>
          <input
            type="number"
            class="w-full border rounded px-2 py-1 text-sm"
            placeholder="Max price"
            value={filterMaxPrice() ?? ""}
            onInput={e =>
              setFilterMaxPrice(e.currentTarget.value ? Number(e.currentTarget.value) : null)
            }
          />
        </div>

        {/* Sales Count */}
        <div>
          <label class="block text-sm font-medium mb-1">Min Sales</label>
          <input
            type="number"
            class="w-full border rounded px-2 py-1 text-sm"
            placeholder="Min sales count"
            value={filterSalesCount() ?? ""}
            onInput={e =>
              setFilterSalesCount(e.currentTarget.value ? Number(e.currentTarget.value) : null)
            }
          />
        </div>

        {/* Impressions */}
        <div>
          <label class="block text-sm font-medium mb-1">Min Impressions</label>
          <input
            type="number"
            class="w-full border rounded px-2 py-1 text-sm"
            placeholder="Min impressions"
            value={filterImpression() ?? ""}
            onInput={e =>
              setFilterImpression(e.currentTarget.value ? Number(e.currentTarget.value) : null)
            }
          />
        </div>

        {/* Created Date */}
        <div>
          <label class="block text-sm font-medium mb-1">Created After</label>
          <input
            type="date"
            class="w-full border rounded px-2 py-1 text-sm"
            value={filterCreated()}
            onInput={e => setFilterCreated(e.currentTarget.value)}
          />
        </div>

        {/* Version */}
        <div>
          <label class="block text-sm font-medium mb-1">Version</label>
          <select
            class="w-full border rounded px-2 py-1 text-sm"
            value={filterVersion()}
            onChange={e => setFilterVersion(e.currentTarget.value)}
          >
            <option value="">All Versions</option>
            <For each={allVersions}>{ver => <option value={ver}>{ver}</option>}</For>
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div class="mt-3">
        <button
          class="text-sm text-blue-600 hover:underline"
          onClick={() => {
            setFilterCategory("");
            setFilterSearch("");
            setFilterTag("");
            setFilterMinPrice(null);
            setFilterMaxPrice(null);
            setFilterSalesCount(null);
            setFilterImpression(null);
            setFilterCreated("");
            setFilterVersion("");
          }}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
