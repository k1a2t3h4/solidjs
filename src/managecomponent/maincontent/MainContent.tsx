// src/components/MainContent.tsx
import { createEffect } from "solid-js";
import { useAppState } from "../../lib/state";
import { lazy } from "solid-js";

// Lazy imports
// const Dashboard = lazy(() => import("../dashboard/Dashboard"));
// const Analytics = lazy(() => import("../analytics/Analytics"));
// const PageBuilder = lazy(() => import("../builder/PageBuilder"));
// const PagesManager = lazy(() => import("../pages/PagesManager"));
const FormData = lazy(() => import("./FormDataComponent/FormData"));
// const EmailMarketing = lazy(() => import("../email/EmailMarketing"));
// const Settings = lazy(() => import("../settings/Settings"));
// const Plugins = lazy(() => import("../plugins/Plugins"));
// const TemplateSelector = lazy(() => import("../builder/TemplateSelector"));
const ThemeManagement = lazy(() => import("./ThemeManagement/ThemeManagement"));


export const MainContent = () => {
  const { state, dispatch } = useAppState();

  // Ensure a website is selected if available
  createEffect(() => {
    if ((state.websites?.length ?? 0) > 0 && !state.selectedWebsiteId) {
      dispatch({ type: "SET_SELECTED_WEBSITE", payload: state.websites![0].id });
      if (!state.selectedFeature) {
        dispatch({ type: "SET_SELECTED_FEATURE", payload: "dashboard" });
      }
    }
  });

  // Render logic (Solid doesn't need "key", so we omit React-style keys)
  const renderContent = () => {
    if (!state.website) {
      return <div class="p-4">No website selected</div>;
    }

    if (state.isCustomizing) {
      return (
        <div class="relative">
          {/* <PageBuilder /> */}
        </div>
      );
    }

    switch (state.selectedFeature) {
    //   case "dashboard":
    //     return <Dashboard />;
      // case "analytics":
      //   return <Analytics />;
      // case "buildpage":
      //   return <TemplateSelector />;
      // case "pages":
      //   return <PagesManager />;
      case "products":
        return <FormData />;

      // case "email":
      //   return <EmailMarketing />;
      // case "plugins":
      //   return <Plugins />;
      case "thememarket":
        return <ThemeManagement />;
      // case "settings":
      //   return <Settings />;
      default:
        return <FormData />;
    }
  };

  return <div id="app1" class={`h-full ${state.isCustomizing ? "p-0" : ""}`}>{renderContent()}</div>;
};
