import { ThemeProvider } from "../../../contexts/ThemeContext";
import TopBar from "./themesection/topbar";
import ThemeDelivery from "./themesection/themedelivery";

export default function ThemeManagement() {
  return (
    <ThemeProvider>
      <div class="p-6">
        <TopBar />
        <ThemeDelivery />
      </div>
    </ThemeProvider>
  );
}
