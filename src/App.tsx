
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import InputSkor from "./pages/InputSkor";
import Analisis from "./pages/Analisis";
import Riwayat from "./pages/Riwayat";
import NotFound from "./pages/NotFound";
import Turnamen from "./pages/Turnamen";
import JadwalTurnamen from "./pages/JadwalTurnamen";
import DetailTurnamen from "./pages/DetailTurnamen";
import Leaderboard from "./pages/Leaderboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input-skor" element={<InputSkor />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/riwayat" element={<Riwayat />} />
          <Route path="/turnamen" element={<Turnamen />} />
          <Route path="/turnamen/jadwal" element={<JadwalTurnamen />} />
          <Route path="/turnamen/:id" element={<DetailTurnamen />} />
          <Route path="/turnamen/leaderboard/:id" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
