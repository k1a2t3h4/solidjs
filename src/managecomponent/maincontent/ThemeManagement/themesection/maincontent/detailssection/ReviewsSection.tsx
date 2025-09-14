import { useThemeContext } from "../../../../../../contexts/ThemeContext";

export default function ReviewsSection() {
  const { selectedTheme, activeSection } = useThemeContext();

  if (!selectedTheme() || activeSection() !== "ThemeDetails") return null;
  const theme = selectedTheme()!;

  // Get the latest version (by createdAt)
  const versions = Object.entries(theme.versions);
  const latestVersion = versions.length
    ? versions.reduce((a, b) => (a[1].createdAt > b[1].createdAt ? a : b))[1]
    : null;

  return (
    <section id="reviews" class="mb-6">
      <h3 class="text-lg font-semibold mb-1">Reviews</h3>
      {latestVersion && (
        <div class="text-gray-500">
          {latestVersion.reviewCount} reviews, {latestVersion.rating}★ average
        </div>
      )}
      {/* Placeholder for reviews */}
    </section>
  );
}
