// src/components/layout/Layout.tsx
import { type JSX, createSignal, onCleanup, onMount, Show } from "solid-js";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAppState } from "../../lib/state";

interface LayoutProps {
  children: JSX.Element;
  key?: string;
}

export const Layout = (props: LayoutProps) => {
  const { state } = useAppState();

  const [isFullscreen, setIsFullscreen] = createSignal(false);
  const [isTransitioning, setIsTransitioning] = createSignal(false);

  // Handle fullscreen state
  onMount(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    onCleanup(() => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    });
  });

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    setIsTransitioning(true);

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen toggle error:", error);
    }

    setTimeout(() => setIsTransitioning(false), 300);
  };


  return (
    <div class="min-h-screen bg-background text-foreground flex">
      {/* Hide sidebar in customization mode */}
      <Show when={!isFullscreen() && !state.isCustomizing}>
        <Sidebar />
      </Show>

      <div
        class={`flex-1 transition-all duration-300 w-screen overflow-hidden ${
          isTransitioning() ? "opacity-95" : "opacity-100"
        } ${
          state.isCustomizing
            ? "ml-0"
            : isFullscreen()
            ? "ml-0"
            : state.sidebarCollapsed
            ? "ml-14"
            : "ml-48"
        }`}
      >
        <Show when={!state.isCustomizing}>
          <button
            onClick={toggleFullscreen}
            class="fixed top-2 left-2 z-50 p-2 rounded-full bg-background/80 hover:bg-background shadow-md"
            aria-label={isFullscreen() ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen() ? <div>minimum</div> : <div>maximum</div>}
          </button>
        </Show>

        {/* Hide topbar in customization mode */}
        <Show when={!isFullscreen() && !state.isCustomizing}>
          <Topbar />
        </Show>

        <main
          class={`overflow-auto transition-all duration-300 ${
            state.isCustomizing
              ? "pt-0 h-screen"
              : isFullscreen()
              ? "h-screen pt-1"
              : "pt-12 h-screen"
          } pb-2 ${state.isCustomizing ? "px-0" : "px-2"}`}
        >
          <Show
            when={state.website}
            fallback={
              <div class="p-4 text-muted-foreground flex items-center justify-center h-full">
                {state.websites && state.websites.length > 0
                  ? "Select a website to continue"
                  : "Create your first website"}
              </div>
            }
          >
            {props.children}
          </Show>
        </main>
      </div>
    </div>
  );
};
