import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Consent from "@/pages/Consent";
import ReadingMaterial from "@/pages/ReadingMaterial";
import GameInstructions from "@/pages/GameInstructions";
import GameEngine from "@/pages/Game/GameEngine";
import Results from "@/pages/Results";
import MainMenu from "@/pages/MainMenu";
import DataView from "@/pages/DataView";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/consent" component={Consent} />
        <Route path="/reading" component={ReadingMaterial} />
        <Route path="/game-intro" component={GameInstructions} />
        <Route path="/game" component={GameEngine} />
        <Route path="/results" component={Results} />
        <Route path="/menu" component={MainMenu} />
        <Route path="/data" component={DataView} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
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
