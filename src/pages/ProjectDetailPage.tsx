import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';

export function ProjectDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { projects, reviews, addReview, announcements } = useData();

  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const project = projects.find(p => p.id === id);
  const projectReviews = reviews.filter(r => r.projectId === id);
  const announcement = project ? announcements.find(a => a.id === project.announcementId) : null;

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Projet introuvable</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const canReview = user && announcement && announcement.userId === user.id && project.status === 'termine';
  const hasReviewed = projectReviews.some(r => r.userId === user?.id);

  const handleSubmitReview = () => {
    if (!user || !reviewComment.trim()) return;

    addReview({
      projectId: project.id,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      rating,
      comment: reviewComment,
    });

    toast.success('Avis publié avec succès');
    setReviewComment('');
    setRating(5);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Project Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl mb-2 text-black">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{project.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Début : {new Date(project.startDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {project.endDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Fin : {new Date(project.endDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  <Badge variant="outline">{project.renovationType}</Badge>
                </div>
              </div>
              <Badge className={project.status === 'termine' ? 'bg-purple-500' : 'bg-[#FF8C42]'}>
                {project.status === 'termine' ? 'Terminé' : 'En cours'}
              </Badge>
            </div>

            <p className="text-foreground">{project.description}</p>
          </CardContent>
        </Card>

        {/* Project Images */}
        <Card>
          <CardHeader>
            <CardTitle>Photos du projet</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="before" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="before">Avant</TabsTrigger>
                <TabsTrigger value="during">Pendant</TabsTrigger>
                <TabsTrigger value="after">Après</TabsTrigger>
              </TabsList>

              <TabsContent value="before" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.before.length > 0 ? (
                    project.images.before.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Avant ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))
                  ) : (
                    <p className="text-muted-foreground col-span-2 text-center py-8">
                      Aucune photo disponible
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="during" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.during.length > 0 ? (
                    project.images.during.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Pendant ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))
                  ) : (
                    <p className="text-muted-foreground col-span-2 text-center py-8">
                      Aucune photo disponible
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="after" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.after.length > 0 ? (
                    project.images.after.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Après ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))
                  ) : (
                    <p className="text-muted-foreground col-span-2 text-center py-8">
                      Aucune photo disponible
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle>Avis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectReviews.length > 0 ? (
              projectReviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p>{review.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-[#FF8C42] text-[#FF8C42]' : 'text-gray-300'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Aucun avis pour le moment
              </p>
            )}
          </CardContent>
        </Card>

        {/* Add Review */}
        {canReview && !hasReviewed && (
          <Card>
            <CardHeader>
              <CardTitle>Laisser un avis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Note</Label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i + 1)}
                      className="focus:outline-none"
                      onMouseEnter={(e) => {
                        if (i >= rating) {
                          const star = e.currentTarget.querySelector('svg');
                          if (star) {
                            star.style.color = '#FE734A';
                            star.style.fill = '#FE734A';
                            star.style.opacity = '0.5';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (i >= rating) {
                          const star = e.currentTarget.querySelector('svg');
                          if (star) {
                            star.style.color = '';
                            star.style.fill = '';
                            star.style.opacity = '';
                          }
                        }
                      }}
                    >
                      <Star
                        className={`h-8 w-8 cursor-pointer transition-colors ${i < rating ? 'fill-[#FE734A] text-[#FE734A]' : 'text-gray-300'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="review">Votre avis</Label>
                <Textarea
                  id="review"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Partagez votre expérience..."
                  rows={4}
                />
              </div>

              <Button onClick={handleSubmitReview} className="bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                Publier l'avis
              </Button>
            </CardContent>
          </Card>
        )}

        {hasReviewed && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Vous avez déjà laissé un avis pour ce projet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
