import { useThemeContext } from "../../../../../../contexts/ThemeContext";

export default function ProfileSection() {
  const { selectedTheme, selectProfile, activeSection } = useThemeContext();

  if (!selectedTheme() || activeSection() !== "ThemeDetails") return null;
  const theme = selectedTheme()!;

  return (
    <section
      id="profile"
      class="mb-6 cursor-pointer hover:bg-gray-50 rounded transition"
      onClick={() => selectProfile(theme.owner)}
      title="View owner profile"
    >
      <h3 class="text-xl font-bold mb-2">Profile</h3>
      <div class="flex items-center gap-4 mb-2">
        {/* Placeholder avatar */}
        <div class="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
          {theme.owner.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div class="font-semibold">Owner: {theme.owner}</div>
          <div class="text-gray-700">Theme: {theme.name}</div>
        </div>
      </div>

      {/* Placeholder for more profile info, e.g., bio, social links */}
      <div class="text-gray-500 text-sm">Bio and social links coming soon...</div>
    </section>
  );
}
