
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Target, LogOut, User, Settings, LogIn, Trophy } from "lucide-react";
import { useAuth } from '@/context/AuthContext';
import MobileNavigation from './MobileNavigation';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const isMobile = useIsMobile();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/input-skor', name: 'Input Skor' },
    { path: '/analisis', name: 'Analisis' },
    { path: '/riwayat', name: 'Riwayat' },
    { path: '/turnamen', name: 'Turnamen' },
  ];

  return (
    <header className="w-full bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          {/* Mobile Navigation */}
          {isAuthenticated && isMobile && <MobileNavigation />}
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-archery-blue flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h1 className={`font-bold text-archery-darkBlue ${isMobile ? 'text-lg' : 'text-2xl'}`}>
              {isMobile ? 'ArcherScore' : 'ArcherScore'}
            </h1>
          </Link>
        </div>
        
        {isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPath === item.path ? "default" : "ghost"}
                asChild
                className="text-sm"
              >
                <Link to={item.path}>
                  {item.name}
                </Link>
              </Button>
            ))}
            {isAdmin && (
              <Button
                variant={currentPath === '/admin' ? "default" : "ghost"}
                asChild
                className="text-sm"
              >
                <Link to="/admin">
                  Admin
                </Link>
              </Button>
            )}
          </nav>
        )}
        
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              {!isMobile && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </div>
              )}
              {!isMobile && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              )}
            </>
          ) : (
            <Button asChild className="bg-archery-blue hover:bg-archery-darkBlue">
              <Link to="/login">
                <LogIn className={`${isMobile ? 'mr-1' : 'mr-2'} h-4 w-4`} />
                {isMobile ? 'Masuk' : 'Masuk'}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
