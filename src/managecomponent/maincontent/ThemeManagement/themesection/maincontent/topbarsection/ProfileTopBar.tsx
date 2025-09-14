import { useThemeContext } from "../../../../../../contexts/ThemeContext";

export default function ProfileTopBar() {
  const { selectedProfile, activeSection } = useThemeContext();

  // Only render if selectedProfile exists and activeSection is 'otherProfile'
  if (!selectedProfile() || activeSection() !== "otherProfile") return null;

  return (
    <div class="flex items-center gap-2 mb-4 justify-between">
      <div class="flex items-center gap-2">
        <span class="font-semibold">{selectedProfile()?.name}</span>
      </div>
    </div>
  );
}
