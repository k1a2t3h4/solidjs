import { useThemeContext } from "../../../../contexts/ThemeContext";
import ThemeCollection from "./maincontent/ThemeCollection";
import ThemeDetails from "./maincontent/ThemeDetails";
import ThemeGlobalAlert from "./maincontent/ThemeGlobalAlert";
import ThemeNotification from "./maincontent/ThemeNotification";
import ThemeMessage from "./maincontent/ThemeMessage";

// Solid lazy loading
import { lazy, Suspense } from "solid-js";

const ThemeOwnerProfile = lazy(() => import("./maincontent/ThemeOwnerProfile"));
const MyProfile = lazy(() => import("./maincontent/MyProfile"));

export default function ThemeDelivery() {
  const { activeSection } = useThemeContext();

  return (
    <>
      {activeSection() === "globalalert" && <ThemeGlobalAlert />}
      {activeSection() === "mynotification" && <ThemeNotification />}
      {activeSection() === "mymessage" && <ThemeMessage />}
      {activeSection() === "myprofile" && (
        <Suspense fallback={<div>Loading profile...</div>}>
          <MyProfile />
        </Suspense>
      )}
      {activeSection() === "otherProfile" && (
        <Suspense fallback={<div>Loading profile...</div>}>
          <ThemeOwnerProfile />
        </Suspense>
      )}
      {activeSection() === "ThemeDetails" && <ThemeDetails />}
      {activeSection() === "ThemeCollection" && <ThemeCollection />}
    </>
  );
}
