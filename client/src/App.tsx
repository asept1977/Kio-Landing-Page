import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Home from "@/pages/Home";
import Verbaende from "@/pages/Verbaende";
import PublicAffairs from "@/pages/PublicAffairs";
import Industrie from "@/pages/Industrie";

import KioOekosystem from "@/pages/KioOekosystem";
import KioUpdates from "@/pages/KioUpdates";
import Interessenvertretung from "@/pages/Interessenvertretung";
import ModulePage from "@/pages/ModulePage";
import Plattformarchitektur from "@/pages/Plattformarchitektur";
import Partnerprogramm from "@/pages/Partnerprogramm";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/verbaende" component={Verbaende} />
        <Route path="/public-affairs" component={PublicAffairs} />
        <Route path="/industrie" component={Industrie} />

        <Route path="/kio-oekosystem" component={KioOekosystem} />
        <Route path="/kio-oekosystem/updates" component={KioUpdates} />
        <Route path="/interessenvertretung" component={Interessenvertretung} />
        <Route path="/plattformarchitektur" component={Plattformarchitektur} />
        <Route path="/partnerprogramm" component={Partnerprogramm} />
        <Route path="/module/:slug">
          {(params: { slug: string }) => <ModulePage slug={params.slug} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
