import { useThemeContext } from "../../../../../../contexts/ThemeContext";

export default function InfoSection() {
  const { selectedTheme, activeSection } = useThemeContext();

  // Guard early if no theme or wrong section
  if (!selectedTheme() || activeSection() !== "ThemeDetails") return null;

  const theme = selectedTheme()!;

  // Compute latest version
  const versions = Object.entries(theme.versions);
  const latestVersion = versions.length
    ? versions.reduce((a, b) => (a[1].createdAt > b[1].createdAt ? a : b))[1]
    : null;

  return (
    <section id="info" class="mb-6">
      <h3 class="text-xl font-bold mb-2">Theme Info</h3>

      {/* Media Gallery */}
      <div class="flex gap-2 mb-2 overflow-x-auto">
        {theme.media.map((url, idx) =>
          url.endsWith(".mp4") ? (
            <video
              src={url}
              controls
              class="w-40 h-24 rounded object-cover"
            />
          ) : (
            <img
              src={url}
              alt={`${theme.name} media`}
              class="w-40 h-24 rounded object-cover"
            />
          )
        )}
      </div>

      <div class="font-bold text-lg mb-1">{theme.name}</div>
      <div class="text-gray-600 mb-2 max-w-[700px]">{theme.description}</div>

      {latestVersion && (
        <>
          <div class="flex gap-4 text-xs text-gray-500 mb-2">
            <span>
              Price:{" "}
              {latestVersion.pricing
                .map((p) => `$${p.price} (${p.type})`)
                .join(", ")}
            </span>
            <span>
              Rating: {latestVersion.rating}★ ({latestVersion.reviewCount} reviews)
            </span>
          </div>

          <div class="text-xs text-gray-400 mb-2">
            Latest Version: {Object.keys(theme.versions).pop()} | Created:{" "}
            {new Date(latestVersion.createdAt).toLocaleDateString()}
          </div>
        </>
      )}
    </section>
  );
}
