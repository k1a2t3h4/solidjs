import type { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import { AuthProvider } from "./contexts/AuthContext";
import { lazy, Suspense } from "solid-js";
import PageNavigater from "./pagenavigater";
import { AppProvider } from "./lib/state";

interface AppProps {
  initialPath?: string;
}

// Lazy imports
const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Register = lazy(() => import("./Register"));
const Manage = lazy(() => import("./Manage"));
const Contact = lazy(() => import("./Contect"));

// Wrappers with navigation
const HomeWithNav: Component = () => (
  <>
    <PageNavigater />
    <Home />
  </>
);

const LoginWithNav: Component = () => (
  <>
    <PageNavigater />
    <Login />
  </>
);

const RegisterWithNav: Component = () => (
  <>
    <PageNavigater />
    <Register />
  </>
);

const ContactWithNav: Component = () => (
  <>
    <PageNavigater />
    <Contact />
  </>
);

const App: Component<AppProps> = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/" component={HomeWithNav} />
          <Route path="/login" component={LoginWithNav} />
          <Route path="/register" component={RegisterWithNav} />
          <Route path="/contact" component={ContactWithNav} />
          <Route
            path="/manage"
            component={() => (
              <AppProvider>
                <Manage />
              </AppProvider>
            )}
          />
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
