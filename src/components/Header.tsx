import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, LogOut, User, Briefcase, Home, FileText, Building2, Users, Gift } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

export function Header() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { notifications, markNotificationAsRead } = useData();

  const unreadCount = notifications.filter(
    (n) => !n.read && n.userId === user?.id
  ).length;

  const navLinks = [
    { to: "/", label: "Accueil", icon: Home },
    { to: "/annonces", label: "Annonces", icon: FileText },
    { to: "/projets", label: "Projets", icon: Building2 },
    ...(isAuthenticated ? [{ to: "/communauté", label: "Communauté", icon: Users }] : []),
    ...(isAuthenticated ? [{ to: "/dons", label: "Dons", icon: Gift }] : []),
  ];

  return (
    <>
      <style>{`
        .gradient-orange {
          background: linear-gradient(to right, #FE734A, #FC473F) !important;
        }
      `}</style>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 items-center">
              <img
                src="/logo.png"
                alt="Les Bons Compagnons Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#FC473F'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#FE734A';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.backgroundColor = '#FE734A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    Tableau de bord
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative transition-colors"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(254, 115, 74, 0.1)';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = '#FE734A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = '';
                      }}
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-white gradient-orange border-transparent">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications
                      .filter((n) => n.userId === user?.id)
                      .slice(0, 5)
                      .map((notif) => {
                        const handleNotificationClick = () => {
                          markNotificationAsRead(notif.id);
                          // Rediriger selon le type de notification
                          if (
                            notif.type === "quote" ||
                            notif.type === "message"
                          ) {
                            navigate(`/annonce/${notif.relatedId}`);
                          } else if (notif.type === "project") {
                            navigate(`/projet/${notif.relatedId}`);
                          }
                        };

                        return (
                          <DropdownMenuItem
                            key={notif.id}
                            className={`cursor-pointer ${!notif.read ? "bg-blue-50" : ""
                              }`}
                            onClick={handleNotificationClick}
                          >
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-medium">{notif.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {notif.message}
                              </p>
                            </div>
                          </DropdownMenuItem>
                        );
                      })}
                    {notifications.filter((n) => n.userId === user?.id).length ===
                      0 && (
                        <DropdownMenuItem disabled>
                          Aucune notification
                        </DropdownMenuItem>
                      )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="transition-colors"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(254, 115, 74, 0.1)';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = '#FE734A';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = '';
                      }}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user?.firstName} {user?.lastName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/profil")}
                      className="cursor-pointer transition-colors"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FE734A';
                        e.currentTarget.style.color = 'white';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = '';
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Mon profil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer transition-colors"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FE734A';
                        e.currentTarget.style.color = 'white';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.color = '';
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/connexion">
                <Button
                  className="text-white hover:opacity-90 transition-opacity border-0 gradient-orange"
                >
                  Connexion
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(254, 115, 74, 0.1)';
                  const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                  if (icon) icon.style.color = '#FE734A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                  if (icon) icon.style.color = '';
                }}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[350px] p-0">
              {/* User Info Header */}
              {isAuthenticated && user && (
                <div className="p-6 pb-4 border-b bg-gradient-to-br from-orange-50 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-14 w-14 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-105" style={{ background: 'linear-gradient(135deg, #FE734A, #FC473F)' }}>
                      <User className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base truncate">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {unreadCount > 0 && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(254, 115, 74, 0.1)' }}>
                          <Bell className="h-4 w-4" style={{ color: '#FE734A' }} />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium">
                            <span className="font-bold" style={{ color: '#FE734A' }}>{unreadCount}</span> notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="px-3 py-2 rounded-lg bg-white/80 backdrop-blur-sm">
                      <Badge className="text-white border-0 shadow-sm" style={{ background: 'linear-gradient(to right, #FE734A, #FC473F)' }}>
                        🪙 {user.points_fidelite ?? 0} points de fidélité
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 relative group"
                      style={{ color: 'inherit' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(254, 115, 74, 0.12)';
                        e.currentTarget.style.color = '#FE734A';
                        e.currentTarget.style.transform = 'translateX(6px)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(254, 115, 74, 0.15)';
                        const ind = e.currentTarget.querySelector('.nav-indicator') as HTMLDivElement;
                        if (ind) {
                          ind.style.backgroundColor = '#FE734A';
                          ind.style.width = '4px';
                        }
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) {
                          icon.style.color = '#FE734A';
                          icon.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '';
                        const ind = e.currentTarget.querySelector('.nav-indicator') as HTMLDivElement;
                        if (ind) {
                          ind.style.backgroundColor = 'transparent';
                          ind.style.width = '2px';
                        }
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) {
                          icon.style.color = '';
                          icon.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      <div className="nav-indicator absolute left-0 top-1/2 -translate-y-1/2 h-8 rounded-r-full transition-all duration-300" style={{ backgroundColor: 'transparent', width: '2px' }}></div>
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300" style={{ backgroundColor: 'rgba(254, 115, 74, 0.08)' }}>
                        <IconComponent className="h-5 w-5 transition-all duration-300" />
                      </div>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}

                {isAuthenticated ? (
                  <>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-3 mx-4"></div>
                    <Link
                      to="/tableau-de-bord"
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 relative group mx-1"
                      style={{ color: 'inherit' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(254, 115, 74, 0.12)';
                        e.currentTarget.style.color = '#FE734A';
                        e.currentTarget.style.transform = 'translateX(6px)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(254, 115, 74, 0.15)';
                        const ind = e.currentTarget.querySelector('.nav-indicator') as HTMLDivElement;
                        if (ind) {
                          ind.style.backgroundColor = '#FE734A';
                          ind.style.width = '4px';
                        }
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) {
                          icon.style.color = '#FE734A';
                          icon.style.transform = 'scale(1.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '';
                        const ind = e.currentTarget.querySelector('.nav-indicator') as HTMLDivElement;
                        if (ind) {
                          ind.style.backgroundColor = 'transparent';
                          ind.style.width = '2px';
                        }
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) {
                          icon.style.color = '';
                          icon.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      <div className="nav-indicator absolute left-0 top-1/2 -translate-y-1/2 h-8 rounded-r-full transition-all duration-300" style={{ backgroundColor: 'transparent', width: '2px' }}></div>
                      <div className="h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-300" style={{ backgroundColor: 'rgba(254, 115, 74, 0.08)' }}>
                        <Briefcase className="h-5 w-5 transition-all duration-300" />
                      </div>
                      <span>Tableau de bord</span>
                    </Link>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-3 mx-4"></div>
                    <Button
                      onClick={() => {
                        logout();
                        navigate("/");
                        toast.success("Vous êtes déconnecté");
                      }}
                      variant="outline"
                      className="justify-start mx-1 mt-1 transition-all duration-300 border-2"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#FE734A';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.backgroundColor = '#FE734A';
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(254, 115, 74, 0.3)';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.transform = 'translateX(2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '';
                        const icon = e.currentTarget.querySelector('svg') as SVGSVGElement;
                        if (icon) icon.style.transform = 'translateX(0)';
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4 transition-transform duration-300" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <div className="mt-6 pt-6 border-t mx-4">
                    <Link to="/connexion">
                      <Button
                        className="w-full text-white hover:opacity-90 transition-all duration-300 border-0 shadow-lg hover:shadow-xl"
                        style={{ background: 'linear-gradient(to right, #FE734A, #FC473F)' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        Connexion
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
