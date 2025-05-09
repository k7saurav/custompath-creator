
import React from 'react';
import { Sparkles, LogOut, User, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
    navigate('/');
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleMyPathsClick = () => {
    navigate('/my-paths');
  };
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <Sparkles className="h-6 w-6 text-brand-purple" />
          <h1 className="text-xl font-bold">Learning Path Creator</h1>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleDashboardClick}
              className="gap-2"
            >
              Dashboard
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleMyPathsClick}
              className="gap-2"
            >
              <Folder className="h-4 w-4" />
              <span className="hidden sm:inline">My Paths</span>
            </Button>
            
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              {user.email}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleMyPathsClick}>
                  <Folder className="mr-2 h-4 w-4" />
                  <span>My Paths</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button variant="outline" onClick={handleAuthClick}>Sign In</Button>
            <Button onClick={handleAuthClick}>Sign Up</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
