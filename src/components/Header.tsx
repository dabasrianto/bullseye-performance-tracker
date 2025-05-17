
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Settings, LogIn } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-archery-blue flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="12" x2="2" y2="12"></line>
                <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                <line x1="6" y1="16" x2="6.01" y2="16"></line>
                <line x1="10" y1="16" x2="10.01" y2="16"></line>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-archery-darkBlue">ArcherScore</h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-archery-text hover:text-archery-blue font-medium transition-colors">Dashboard</Link>
          <Link to="/input-skor" className="text-archery-text hover:text-archery-blue font-medium transition-colors">Input Skor</Link>
          <Link to="/analisis" className="text-archery-text hover:text-archery-blue font-medium transition-colors">Analisis</Link>
          <Link to="/riwayat" className="text-archery-text hover:text-archery-blue font-medium transition-colors">Riwayat</Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
          <Button className="bg-archery-blue hover:bg-archery-darkBlue">
            <LogIn className="mr-2 h-4 w-4" /> Masuk
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
