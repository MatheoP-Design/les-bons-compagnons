import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Hammer, Menu, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

export function Header() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { notifications, markNotificationAsRead } = useData();

  const unreadCount = notifications.filter(n => !n.read && n.userId === user?.id).length;

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/annonces', label: 'Annonces' },
    { to: '/projets', label: 'Projets' },
    ...(isAuthenticated ? [{ to: '/communauté', label: 'Communauté' }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C42]">
            <Hammer className="h-6 w-6 text-white" />
          </div>
          <span className="text-lg font-semibold text-[#2C5F8D]">Les bons compagnons</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm transition-colors hover:text-[#FF8C42]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/tableau-de-bord">
                <Button variant="outline" size="sm">
                  Tableau de bord
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#FF8C42] text-white"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.filter(n => n.userId === user?.id).slice(0, 5).map((notif) => {
                    const handleNotificationClick = () => {
                      markNotificationAsRead(notif.id);
                      // Rediriger selon le type de notification
                      if (notif.type === 'quote' || notif.type === 'message') {
                        navigate(`/annonce/${notif.relatedId}`);
                      } else if (notif.type === 'project') {
                        navigate(`/projet/${notif.relatedId}`);
                      }
                    };

                    return (
                      <DropdownMenuItem
                        key={notif.id}
                        className={`cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                        onClick={handleNotificationClick}
                      >
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium">{notif.title}</p>
                          <p className="text-xs text-muted-foreground">{notif.message}</p>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                  {notifications.filter(n => n.userId === user?.id).length === 0 && (
                    <DropdownMenuItem disabled>
                      Aucune notification
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user?.firstName} {user?.lastName}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profil')}>
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/connexion">
              <Button className="bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                Connexion
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-lg transition-colors hover:text-[#FF8C42]"
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link to="/tableau-de-bord" className="text-lg transition-colors hover:text-[#FF8C42]">
                    Tableau de bord
                  </Link>
                  <Button onClick={logout} variant="outline" className="justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <Link to="/connexion">
                  <Button className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                    Connexion
                  </Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}