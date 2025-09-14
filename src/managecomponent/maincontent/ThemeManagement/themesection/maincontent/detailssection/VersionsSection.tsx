import { useThemeContext } from "../../../../../../contexts/ThemeContext";
import { For } from "solid-js";

export default function VersionsSection() {
  const { selectedTheme, activeSection } = useThemeContext();

  if (!selectedTheme() || activeSection() !== "ThemeDetails") return null;
  const theme = selectedTheme()!;

  const versions = Object.entries(theme.versions);

  return (
    <section id="versions" class="mb-6">
      <h3 class="text-lg font-semibold mb-1">Versions</h3>
      <ul class="list-disc ml-6">
        <For each={versions}>
          {([ver, info]) => (
            <li id={`version-${ver}`} class="mb-4">
              <div class="font-bold">Version: {ver}</div>
              <div class="text-xs text-gray-500 mb-1">
                Created: {new Date(info.createdAt).toLocaleDateString()}
              </div>
              <div class="mb-1">
                Pricing: {info.pricing.map(p => `${p.type}: $${p.price}`).join(", ")}
              </div>
              <div class="mb-1">
                Rating: {info.rating}★ ({info.reviewCount} reviews)
              </div>
              <div class="mb-1 flex gap-2 text-xs">
                <For each={Object.entries(info.starCounts)}>
                  {([star, count]) => <span>{star}★: {count}</span>}
                </For>
              </div>
              <div class="mb-1 text-xs text-gray-600">
                Pages: {Object.keys(info.TemplatePages).join(", ")}
              </div>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
