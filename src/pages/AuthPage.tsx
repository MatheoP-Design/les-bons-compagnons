import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner@2.0.3';

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    role: 'particulier' as 'particulier' | 'cadre',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginEmail, loginPassword);
    
    if (success) {
      toast.success('Connexion réussie !');
      navigate('/tableau-de-bord');
    } else {
      toast.error('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(registerData);
    
    if (success) {
      toast.success('Inscription réussie !');
      navigate('/tableau-de-bord');
    } else {
      toast.error('Cette adresse email est déjà utilisée');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Connexion</CardTitle>
                <CardDescription>
                  Connectez-vous à votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="sophie@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="123456"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                    Se connecter
                  </Button>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-muted-foreground">
                    <p className="font-semibold mb-2">Comptes de test :</p>
                    <p><strong>Particuliers:</strong> sophie@example.com, pierre@example.com</p>
                    <p><strong>Cadres:</strong> jean@compagnons.fr, paul@compagnons.fr</p>
                    <p className="mt-1"><strong>Mot de passe:</strong> 123456</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full text-xs"
                      onClick={() => {
                        // Réinitialiser les utilisateurs
                        const mockUsers = [
                          { id: 'user1', email: 'sophie@example.com', password: '123456', firstName: 'Sophie', lastName: 'Bernard', phone: '06 12 34 56 78', city: 'Lyon', role: 'particulier' },
                          { id: 'user2', email: 'pierre@example.com', password: '123456', firstName: 'Pierre', lastName: 'Martin', phone: '06 23 45 67 89', city: 'Paris', role: 'particulier' },
                          { id: 'user3', email: 'marie@example.com', password: '123456', firstName: 'Marie', lastName: 'Dubois', phone: '06 34 56 78 90', city: 'Bordeaux', role: 'particulier' },
                          { id: 'user4', email: 'lucas@example.com', password: '123456', firstName: 'Lucas', lastName: 'Moreau', phone: '06 45 67 89 01', city: 'Toulouse', role: 'particulier' },
                          { id: 'cadre1', email: 'jean@compagnons.fr', password: '123456', firstName: 'Jean', lastName: 'Dupont', phone: '06 11 22 33 44', city: 'Lyon', role: 'cadre' },
                          { id: 'cadre2', email: 'paul@compagnons.fr', password: '123456', firstName: 'Paul', lastName: 'Lefebvre', phone: '06 22 33 44 55', city: 'Paris', role: 'cadre' },
                          { id: 'cadre3', email: 'michel@compagnons.fr', password: '123456', firstName: 'Michel', lastName: 'Garnier', phone: '06 33 44 55 66', city: 'Bordeaux', role: 'cadre' },
                        ];
                        localStorage.setItem('users', JSON.stringify(mockUsers));
                        toast.success('Comptes réinitialisés ! Vous pouvez maintenant vous connecter.');
                      }}
                    >
                      Réinitialiser les comptes de test
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Inscription</CardTitle>
                <CardDescription>
                  Créez votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      id="password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville</Label>
                    <Input
                      id="city"
                      value={registerData.city}
                      onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Rôle</Label>
                    <Select
                      value={registerData.role}
                      onValueChange={(value: 'particulier' | 'cadre') => 
                        setRegisterData({ ...registerData, role: value })
                      }
                    >
                      <SelectTrigger id="role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="particulier">Particulier</SelectItem>
                        <SelectItem value="cadre">Cadre des compagnons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                    S'inscrire
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
