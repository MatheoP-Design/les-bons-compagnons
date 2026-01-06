import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import type { AnnouncementStatus } from '../types';

const statusLabels: Record<AnnouncementStatus, { label: string; color: string }> = {
  en_attente: { label: 'En attente', color: 'bg-gray-500' },
  devis_envoye: { label: 'Devis envoyé', color: 'bg-blue-500' },
  accepte: { label: 'Accepté', color: 'bg-green-500' },
  refuse: { label: 'Refusé', color: 'bg-red-500' },
  en_cours: { label: 'En cours', color: 'bg-[#FF8C42]' },
  termine: { label: 'Terminé', color: 'bg-purple-500' },
};

export function AnnouncementsPage() {
  const { announcements } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');

  const cities = Array.from(new Set(announcements.map(a => a.city)));

  const filteredAnnouncements = announcements.filter(announcement => {
    // Exclure les annonces terminées et refusées
    if (announcement.status === 'termine' || announcement.status === 'refuse') {
      return false;
    }

    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus;
    const matchesCity = filterCity === 'all' || announcement.city === filterCity;

    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl mb-4 text-[#2C5F8D]">Toutes les annonces</h1>
        <p className="text-muted-foreground">
          Découvrez les projets de rénovation en cours et proposez vos services
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Rechercher une annonce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {Object.entries(statusLabels)
              .filter(([value]) => value !== 'termine' && value !== 'refuse')
              .map(([value, { label }]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select value={filterCity} onValueChange={setFilterCity}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par ville" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {cities.map(city => (
              <SelectItem key={city} value={city}>{city}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Announcements List */}
      <div>
        {filteredAnnouncements.map((announcement, index) => (
          <div key={announcement.id} style={{ marginBottom: index < filteredAnnouncements.length - 1 ? '32px' : '0' }}>
            <Link
              to={`/annonce/${announcement.id}`}
              className="block"
            >
              <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-transparent hover:border-[#FF8C42] gap-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 md:h-72 flex-shrink-0">
                    <img
                      src={announcement.imageUrl}
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl mb-2 text-[#2C5F8D]">{announcement.title}</h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{announcement.city}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(announcement.createdAt).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <Badge variant="outline">{announcement.renovationType}</Badge>
                        </div>
                      </div>
                      <Badge className={`${statusLabels[announcement.status].color} text-white`}>
                        {statusLabels[announcement.status].label}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground line-clamp-3">
                      {announcement.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        ))}

        {filteredAnnouncements.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Aucune annonce trouvée</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}