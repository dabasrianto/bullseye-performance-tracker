
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
import AdminDashboard from "./pages/Admin";
import { AdminProvider } from "./context/AdminContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
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
            <Route path="/admin" element={<AdminDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
