
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Settings, Calendar, BarChart2, FileText } from "lucide-react";

interface NavigationItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ to, icon: Icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        isActive
          ? "bg-archery-blue/10 text-archery-blue font-medium"
          : "text-archery-text hover:bg-muted"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const AdminNavigation: React.FC = () => {
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
    <nav className="space-y-1 py-2">
      {navItems.map((item) => (
        <NavigationItem
          key={item.path}
          to={item.path}
          icon={item.icon}
          label={item.label}
          isActive={currentPath === item.path}
        />
      ))}
    </nav>
  );
};

export default AdminNavigation;
