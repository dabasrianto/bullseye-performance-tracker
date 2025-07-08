import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Settings, Calendar, BarChart2, FileText } from "lucide-react";
import { Link, useLocation, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/users", icon: Users, label: "Pengguna" },
    { path: "/admin/tournaments", icon: Calendar, label: "Turnamen" },
    { path: "/admin/analytics", icon: BarChart2, label: "Analisis" },
    { path: "/admin/content", icon: FileText, label: "Konten" },
    { path: "/admin/settings", icon: Settings, label: "Pengaturan" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <Sidebar>
            <SidebarHeader className="flex h-14 items-center border-b px-4">
              <span className="font-semibold text-xl text-foreground">ArcherScore Admin</span>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild
                      tooltip={item.label}
                      isActive={currentPath === item.path}
                    >
                      <Link to={item.path}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Admin Panel v1.0
              </div>
            </SidebarFooter>
          </Sidebar>
          
          <div className="flex-1 overflow-auto">
            <header className="bg-card shadow-sm border-b">
              <div className="flex items-center py-4 px-6">
                <SidebarTrigger className="mr-4" />
                <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
              </div>
            </header>
            
            <main className="container mx-auto py-6 px-4 md:px-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;