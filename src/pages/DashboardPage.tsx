import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Plus, FileText, MessageSquare, Briefcase, Eye, LogOut } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { AnnouncementStatus } from '../types';

const statusLabels: Record<AnnouncementStatus, { label: string; color: string }> = {
  en_attente: { label: 'En attente', color: 'bg-gray-500' },
  devis_envoye: { label: 'Devis envoyé', color: 'bg-blue-500' },
  accepte: { label: 'Accepté', color: 'bg-green-500' },
  refuse: { label: 'Refusé', color: 'bg-red-500' },
  en_cours: { label: 'En cours', color: 'bg-[#FF8C42]' },
  termine: { label: 'Terminé', color: 'bg-purple-500' },
};

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { announcements, quotes, projects, addAnnouncement } = useData();
  
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    description: '',
    city: '',
    renovationType: '',
    imageUrl: '',
  });

  if (!user) {
    navigate('/connexion');
    return null;
  }

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.description || !newAnnouncement.city || !newAnnouncement.renovationType) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    addAnnouncement({
      ...newAnnouncement,
      status: 'en_attente',
      imageUrl: newAnnouncement.imageUrl || 'https://images.unsplash.com/photo-1646592491550-6ef7a11ecc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NzY1ODUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    });

    toast.success('Annonce créée avec succès');
    setNewAnnouncement({
      title: '',
      description: '',
      city: '',
      renovationType: '',
      imageUrl: '',
    });
  };

  if (user.role === 'particulier') {
    const myAnnouncements = announcements.filter(a => a.userId === user.id);
    const myQuotes = quotes.filter(q => 
      myAnnouncements.some(a => a.id === q.announcementId)
    );
    const myProjects = projects.filter(p => 
      myAnnouncements.some(a => a.id === p.announcementId)
    );

    return (
      <div className="container px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2 text-[#2C5F8D]">
              Tableau de bord - Particulier
            </h1>
            <p className="text-muted-foreground">
              Bienvenue {user.firstName} {user.lastName}
            </p>
          </div>
          <Button
            onClick={() => {
              logout();
              navigate('/');
              toast.success('Vous êtes déconnecté');
            }}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">
                Mes annonces
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-[#2C5F8D]">{myAnnouncements.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">
                Devis reçus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-[#FF8C42]">{myQuotes.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">
                Projets en cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-600">{myProjects.filter(p => p.status === 'en_cours').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Announcement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Créer une nouvelle annonce
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  placeholder="Ex: Rénovation escalier en chêne"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={newAnnouncement.city}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, city: e.target.value })}
                    placeholder="Lyon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type de rénovation</Label>
                  <Select
                    value={newAnnouncement.renovationType}
                    onValueChange={(value) => setNewAnnouncement({ ...newAnnouncement, renovationType: value })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Meuble">Meuble</SelectItem>
                      <SelectItem value="Escalier">Escalier</SelectItem>
                      <SelectItem value="Toiture">Toiture</SelectItem>
                      <SelectItem value="Parquet">Parquet</SelectItem>
                      <SelectItem value="Charpente">Charpente</SelectItem>
                      <SelectItem value="Monument">Monument</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAnnouncement.description}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                  placeholder="Décrivez votre projet en détail..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
                <Input
                  id="imageUrl"
                  value={newAnnouncement.imageUrl}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, imageUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <Button onClick={handleCreateAnnouncement} className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                Publier l'annonce
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>Mes annonces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myAnnouncements.length > 0 ? (
                myAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/annonce/${announcement.id}`)}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground">{announcement.city}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${statusLabels[announcement.status].color} text-white`}>
                        {statusLabels[announcement.status].label}
                      </Badge>
                      {quotes.filter(q => q.announcementId === announcement.id).length > 0 && (
                        <Badge variant="outline">
                          {quotes.filter(q => q.announcementId === announcement.id).length} devis
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Aucune annonce créée
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Cadre Dashboard
  const receivedAnnouncements = announcements.filter(a => a.status === 'en_attente');
  const myQuotes = quotes.filter(q => q.cadreId === user.id);
  const acceptedProjects = myQuotes.filter(q => q.accepted === true);

  return (
    <div className="container px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl mb-2 text-[#2C5F8D]">
            Tableau de bord - Cadre des Compagnons
          </h1>
          <p className="text-muted-foreground">
            Bienvenue {user.firstName} {user.lastName}
          </p>
        </div>
        <Button
          onClick={() => {
            logout();
            navigate('/');
            toast.success('Vous êtes déconnecté');
          }}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Demandes disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#2C5F8D]">{receivedAnnouncements.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Devis envoyés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-[#FF8C42]">{myQuotes.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Projets acceptés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl text-green-600">{acceptedProjects.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Requests */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Demandes disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {receivedAnnouncements.length > 0 ? (
              receivedAnnouncements.slice(0, 5).map((announcement) => (
                <div
                  key={announcement.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{announcement.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {announcement.city} - {announcement.renovationType}
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate(`/annonce/${announcement.id}`)}
                    size="sm"
                    className="bg-[#2C5F8D] hover:bg-[#2C5F8D]/90"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Voir
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Aucune demande disponible pour le moment
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* My Quotes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mes devis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myQuotes.length > 0 ? (
              myQuotes.map((quote) => {
                const announcement = announcements.find(a => a.id === quote.announcementId);
                return (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/annonce/${quote.announcementId}`)}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{announcement?.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Montant : {quote.amount.toLocaleString('fr-FR')} €
                      </p>
                    </div>
                    <div>
                      {quote.accepted === true && (
                        <Badge className="bg-green-500 text-white">Accepté</Badge>
                      )}
                      {quote.accepted === false && (
                        <Badge className="bg-red-500 text-white">Refusé</Badge>
                      )}
                      {quote.accepted === undefined && (
                        <Badge className="bg-blue-500 text-white">En attente</Badge>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Aucun devis envoyé
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}