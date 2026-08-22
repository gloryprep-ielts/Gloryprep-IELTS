import { IntroSplash } from "@/components/IntroSplash";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MockTest from "./pages/MockTest";
import Results from "./pages/Results";
import Lessons from "./pages/Lessons";
import LearnLesson from "./pages/LearnLesson";
import ThankYou from "./pages/ThankYou";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Agreement from "./pages/Agreement";
import About from "./pages/About";
import Refund from "./pages/Refund";
import Faq from "./pages/Faq";
import Pricing from "./pages/Pricing";
import Store from "./pages/Store";
import StoreCheckout from "./pages/StoreCheckout";
import UnlockSuccess from "./pages/UnlockSuccess";
import PracticeLibrary from "./pages/PracticeLibrary";
import MockKit from "./pages/MockKit";
import MockAttempt from "./pages/MockAttempt";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/test"} component={MockTest} />
      <Route path={"/results"} component={Results} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/lessons"} component={Lessons} />
      <Route path={"/learn/:slug"} component={LearnLesson} />
      <Route path={"/thank-you"} component={ThankYou} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/agreement"} component={Agreement} />
      <Route path={"/faq"} component={Faq} />
      <Route path={"/store"} component={Store} />
      <Route path={"/store/checkout/:sku"} component={StoreCheckout} />
      <Route path={"/unlock-success/:sku"} component={UnlockSuccess} />
      <Route path={"/practice/library"} component={PracticeLibrary} />
      <Route path={"/practice/kit"} component={MockKit} />
      <Route path={"/practice/mock/:skill"} component={MockAttempt} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/login"} component={Login} />
      <Route path={"/about"} component={About} />
      <Route path={"/refund"} component={Refund} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <IntroSplash />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
