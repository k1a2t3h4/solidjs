import ProfileSection from "./detailssection/ProfileSection";
import InfoSection from "./detailssection/InfoSection";
import VersionsSection from "./detailssection/VersionsSection";
import ReviewsSection from "./detailssection/ReviewsSection";
import RelatedSection from "./detailssection/RelatedSection";
import { useThemeContext } from "../../../../../contexts/ThemeContext";

export default function ThemeDetails() {
  const { selectedTheme, activeSection } = useThemeContext();

  // Solid signals are functions → call them
  if (!selectedTheme() || activeSection() !== "ThemeDetails") {
    return null;
  }

  return (
    <div>
      <ProfileSection />
      <InfoSection />
      <VersionsSection />
      <ReviewsSection />
      <RelatedSection />
    </div>
  );
}
