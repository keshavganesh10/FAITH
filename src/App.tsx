import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider, useUser } from "@/state/user";
import { ThemeProvider } from "@/state/theme";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/app/Home";
import Scriptures from "./pages/app/Scriptures";
import ScriptureReader from "./pages/app/ScriptureReader";
import Community from "./pages/app/Community";
import Market from "./pages/app/Market";
import ProductDetail from "./pages/app/ProductDetail";
import Basket from "./pages/app/Basket";
import Profile from "./pages/app/Profile";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const RequireOnboarding = ({ children }: { children: JSX.Element }) => {
  const { onboarded } = useUser();
  return onboarded ? children : <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/app" element={<RequireOnboarding><AppLayout /></RequireOnboarding>}>
                <Route index element={<Home />} />
                <Route path="scriptures" element={<Scriptures />} />
                <Route path="scriptures/:id" element={<ScriptureReader />} />
                <Route path="community" element={<Community />} />
                <Route path="market" element={<Market />} />
                <Route path="market/basket" element={<Basket />} />
                <Route path="market/:id" element={<ProductDetail />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
