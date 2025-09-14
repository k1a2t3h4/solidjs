import { Component, For, createMemo } from "solid-js";
import { useThemeContext } from "../../../../../../contexts/ThemeContext";

const ThemeTopBar: Component = () => {
  const { selectedTheme, activeSection } = useThemeContext();

  // Guard against null and only show in ThemeDetails
  const theme = createMemo(() => {
    const t = selectedTheme();
    return t && activeSection() === "ThemeDetails" ? t : null;
  });

  return (
    <div>
      {theme() && (
        <div class="flex items-center gap-2 mb-4">
          {/* Versions dropdown/links */}
          <div class="flex gap-2 ml-2">
            <For each={Object.keys(theme()!.versions)}>
              {(ver) => (
                <a
                  href={`#version-${ver}`}
                  class="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 border border-gray-200"
                >
                  {ver}
                </a>
              )}
            </For>
          </div>

          {/* Topics: Info, Versions, Reviews, Related */}
          <div class="flex gap-2 ml-4">
            <a href="#profile" class="text-blue-600 hover:underline">
              Profile
            </a>
            <a href="#info" class="text-blue-600 hover:underline">
              Info
            </a>
            <a href="#reviews" class="text-blue-600 hover:underline">
              Reviews
            </a>
            <a href="#related" class="text-blue-600 hover:underline">
              Related
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeTopBar;
