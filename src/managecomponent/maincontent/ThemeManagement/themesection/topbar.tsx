import { createMemo } from "solid-js";
import { useThemeContext } from "../../../../contexts/ThemeContext";
import ProfileTopBar from "./maincontent/topbarsection/ProfileTopBar";
import ThemeTopBar from "./maincontent/topbarsection/ThemeTopBar";
import CollectionTopBar from "./maincontent/topbarsection/CollectionTopBar";

import { myNotificationData, myMessageData } from "../../../../lib/form-data";

export default function TopBar() {
  const {
    activeSection,
    setActiveSection,
    showMyProfile,
    showGlobalAlert,
    showMyNotification,
    showMyMessage,
  } = useThemeContext();

  // Reactive counts
  const unreadNotifications = createMemo(
    () => myNotificationData.filter((n) => !n.read).length
  );
  const unreadMessages = createMemo(
    () => myMessageData.filter((m) => !m.read).length
  );

  return (
    <div class="flex items-center justify-between mb-4">
      {/* Left side */}
      <div class="flex items-center gap-2">
        {activeSection() !== "" && (
          <button
            class="p-1 rounded hover:bg-gray-200"
            onClick={() => setActiveSection("")}
            title="Back"
          >
            ←
          </button>
        )}
        {activeSection() === "otherProfile" && <ProfileTopBar />}
        {activeSection() === "ThemeDetails" && <ThemeTopBar />}
        {activeSection() === "" && <CollectionTopBar />}
      </div>

      {/* Right side */}
      <div class="ml-4 flex items-center gap-3">
        {activeSection() !== "globalalert" && (
          <div class="relative">
            <button
              
              class="text-gray-500 cursor-pointer"
              aria-label="Market Alerts"
              onClick={showGlobalAlert}
            />
          </div>
        )}

        {activeSection() !== "mynotification" && (
          <div class="relative">
            <button
              
              class="text-gray-500 cursor-pointer"
              aria-label="Notifications"
              onClick={showMyNotification}
            />
            {unreadNotifications() > 0 && (
              <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 min-w-[18px] text-center">
                {unreadNotifications()}
              </span>
            )}
          </div>
        )}

        {activeSection() !== "mymessage" && (
          <div class="relative">
            <button
              class="text-gray-500 cursor-pointer"
              aria-label="Messages"
              onClick={showMyMessage}
            />
            {unreadMessages() > 0 && (
              <span class="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full px-1.5 min-w-[18px] text-center">
                {unreadMessages()}
              </span>
            )}
          </div>
        )}

        {activeSection() !== "myprofile" && (
          <img
            src="https://randomuser.me/api/portraits/men/99.jpg"
            alt="My Profile"
            class="w-9 h-9 rounded-full object-cover border border-gray-300 cursor-pointer"
            onClick={showMyProfile}
          />
        )}
      </div>
    </div>
  );
}
