import { useThemeContext } from "../../../../../../contexts/ThemeContext";

export default function RelatedSection() {
  const { activeSection } = useThemeContext();

  if (activeSection() !== "ThemeDetails") return null;

  return (
    <section id="related">
      <h3 class="text-lg font-semibold mb-1">Related Themes</h3>
      {/* Placeholder for related themes */}
    </section>
  );
}
