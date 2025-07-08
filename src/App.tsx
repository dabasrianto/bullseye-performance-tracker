
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
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTournaments from "./pages/admin/AdminTournaments";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminContent from "./pages/admin/AdminContent";
import AdminSettings from "./pages/admin/AdminSettings";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <AdminProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/input-skor" element={
                <ProtectedRoute>
                  <InputSkor />
                </ProtectedRoute>
              } />
              <Route path="/analisis" element={
                <ProtectedRoute>
                  <Analisis />
                </ProtectedRoute>
              } />
              <Route path="/riwayat" element={
                <ProtectedRoute>
                  <Riwayat />
                </ProtectedRoute>
              } />
              <Route path="/turnamen" element={
                <ProtectedRoute>
                  <Turnamen />
                </ProtectedRoute>
              } />
              <Route path="/turnamen/jadwal" element={
                <ProtectedRoute>
                  <JadwalTurnamen />
                </ProtectedRoute>
              } />
              <Route path="/turnamen/:id" element={
                <ProtectedRoute>
                  <DetailTurnamen />
                </ProtectedRoute>
              } />
              <Route path="/turnamen/leaderboard/:id" element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="tournaments" element={<AdminTournaments />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
