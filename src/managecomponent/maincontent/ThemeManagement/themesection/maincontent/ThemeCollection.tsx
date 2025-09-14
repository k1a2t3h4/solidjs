import { useThemeContext } from "../../../../../contexts/ThemeContext";
import FilterSection from "./Filterparts/FilterSection";
import ThemeCard from "./Filterparts/ThemeCard";

export default function ThemeCollection() {
  const { filteredThemes, SelectedThemeDetail } = useThemeContext();

  return (
    <div>
      <FilterSection />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredThemes().length === 0 && (
          <div class="col-span-full text-center text-gray-500 py-8">
            No themes found matching your filters.
          </div>
        )}
        {filteredThemes().map((theme) => (
          <ThemeCard theme={theme} onSelect={() => SelectedThemeDetail(theme.id)} />
        ))}
      </div>
    </div>
  );
}
