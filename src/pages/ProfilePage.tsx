import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { User, Mail, MapPin, Briefcase } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    city: user?.city || '',
    company: user?.company || '',
  });

  if (!user) {
    navigate('/connexion');
    return null;
  }

  const handleSave = () => {
    // En production, ceci mettrait à jour les données dans la base de données
    toast.success('Profil mis à jour avec succès');
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2 text-black">Mon Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations personnelles
              </CardTitle>
              <Badge className={user.role === 'cadre' ? 'bg-[#2C5F8D]' : 'bg-[#FF8C42]'}>
                {user.role === 'cadre' ? 'Cadre des Compagnons' : 'Particulier'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-[#FF8C42] flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Prénom
                </Label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                ) : (
                  <p className="text-lg">{user.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nom
                </Label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                ) : (
                  <p className="text-lg">{user.lastName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <p className="text-lg">{user.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Ville
                </Label>
                {isEditing ? (
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                ) : (
                  <p className="text-lg">{user.city || 'Non renseigné'}</p>
                )}
              </div>

              {user.role === 'cadre' && (
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Entreprise
                  </Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  ) : (
                    <p className="text-lg">{user.company || 'Non renseigné'}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-[#FF8C42] hover:bg-[#FF8C42]/90"
                  >
                    Enregistrer
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        city: user.city || '',
                        company: user.company || '',
                      });
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-[#2C5F8D] hover:bg-[#2C5F8D]/90"
                >
                  Modifier le profil
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations de compte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">Type de compte</p>
                <p className="text-sm text-muted-foreground">
                  {user.role === 'cadre' ? 'Cadre des Compagnons Artisans' : 'Particulier'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="text-sm font-medium">Membre depuis</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
