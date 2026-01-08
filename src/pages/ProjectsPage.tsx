import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export function ProjectsPage() {
  const { projects } = useData();

  // Filtrer pour n'afficher que les projets terminés
  const completedProjects = projects.filter(project => project.status === 'termine');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl mb-4 text-black">Projets réalisés</h1>
        <p className="text-muted-foreground">
          Découvrez les réalisations de nos compagnons artisans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedProjects.map((project) => {
          const mainImage = project.images.after[0] || project.images.during[0] || project.images.before[0];
          
          return (
            <Link key={project.id} to={`/projet/${project.id}`}>
              <Card 
                className="overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-transparent h-full"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#FE734A'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <CardContent className="p-0">
                  <img
                    src={mainImage}
                    alt={project.title}
                    className="w-full h-28 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-xl text-black">{project.title}</h2>
                      <Badge className={project.status === 'termine' ? 'bg-purple-500' : 'bg-[#FF8C42]'}>
                        {project.status === 'termine' ? 'Terminé' : 'En cours'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{project.city}</span>
                      <Badge variant="outline" className="ml-2">{project.renovationType}</Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {completedProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Aucun projet terminé pour le moment</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
