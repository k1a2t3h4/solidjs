// // src/components/ClientOnlyManage.tsx
// import { createSignal, onMount } from "solid-js";
// import { AppProvider } from "./lib/state";
// import Manage from "./Manage";

// export default function ClientOnlyManage() {
//   const [isClient, setIsClient] = createSignal(false);

//   onMount(() => setIsClient(true));

//   return isClient() ? (
//     <AppProvider>
//       <Manage />
//     </AppProvider>
//   ) : (
//     <div>Loading...</div>
//   );
// }
