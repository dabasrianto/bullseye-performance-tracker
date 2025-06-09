import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Target, 
  Home, 
  Plus, 
  BarChart3, 
  History, 
  Trophy, 
  User, 
  Settings, 
  LogOut,
  Shield,
  Users,
  FileText,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();

  const userNavItems = [
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/input-skor', name: 'Input Skor', icon: Plus },
    { path: '/analisis', name: 'Analisis', icon: BarChart3 },
    { path: '/riwayat', name: 'Riwayat', icon: History },
    { path: '/turnamen', name: 'Turnamen', icon: Trophy },
  ];

  const adminNavItems = [
    { path: '/admin', name: 'Admin Dashboard', icon: Shield },
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/input-skor', name: 'Input Skor', icon: Plus },
    { path: '/analisis', name: 'Analisis', icon: BarChart3 },
    { path: '/riwayat', name: 'Riwayat', icon: History },
    { path: '/turnamen', name: 'Turnamen', icon: Trophy },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  const handleNavClick = () => {
    setOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <div className="flex items-center space-x-2 p-6 border-b">
            <div className="w-8 h-8 rounded-full bg-archery-blue flex items-center justify-center">
              <Target className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-archery-darkBlue">ArcherScore</h1>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b bg-muted/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-archery-blue flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
                {isAdmin && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-archery-orange text-white mt-1">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-archery-blue text-white" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Keluar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;