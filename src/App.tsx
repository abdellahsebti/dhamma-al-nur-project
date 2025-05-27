import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import Podcasts from "./pages/Podcasts";
import AlQawlAlMufid from "./pages/AlQawlAlMufid";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";
import CoffeeEyes from "./pages/CoffeeEyes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

const queryClient = new QueryClient();
const router = createBrowserRouter(routes);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
