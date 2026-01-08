import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Plus,
  FileText,
  MessageSquare,
  Briefcase,
  Eye,
  LogOut,
  Edit,
  X,
} from "lucide-react";
import { toast } from "sonner";
import type { AnnouncementStatus, Project } from "../types";

const statusLabels: Record<
  AnnouncementStatus,
  { label: string; color: string }
> = {
  en_attente: { label: "En attente", color: "bg-gray-500" },
  devis_envoye: { label: "Devis envoyé", color: "bg-blue-500" },
  accepte: { label: "Accepté", color: "bg-green-500" },
  refuse: { label: "Refusé", color: "bg-red-500" },
  en_cours: { label: "En cours", color: "bg-[#FE734A]" },
  termine: { label: "Terminé", color: "bg-purple-500" },
};

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { announcements, quotes, projects, addAnnouncement, updateProject } =
    useData();

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: "",
    city: "",
    renovationType: "",
    imageUrl: "",
  });

  if (!user) {
    return null;
  }

  const handleCreateAnnouncement = () => {
    if (
      !newAnnouncement.title ||
      !newAnnouncement.description ||
      !newAnnouncement.city ||
      !newAnnouncement.renovationType
    ) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    addAnnouncement({
      ...newAnnouncement,
      status: "en_attente",
      imageUrl:
        newAnnouncement.imageUrl ||
        "https://images.unsplash.com/photo-1646592491550-6ef7a11ecc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NzY1ODUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    });

    toast.success("Annonce créée avec succès");
    setNewAnnouncement({
      title: "",
      description: "",
      city: "",
      renovationType: "",
      imageUrl: "",
    });
  };

  if (user.role === "particulier") {
    const myAnnouncements = announcements.filter((a) => a.userId === user.id);
    const myQuotes = quotes.filter((q) =>
      myAnnouncements.some((a) => a.id === q.announcementId)
    );
    const myProjects = projects.filter((p) =>
      myAnnouncements.some((a) => a.id === p.announcementId)
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2 text-black">
              Tableau de bord - Particulier
            </h1>
            <p className="text-muted-foreground">
              Bienvenue {user.firstName} {user.lastName}
            </p>
            <Badge className="mt-4 text-white border-0" style={{ background: 'linear-gradient(to right, #FE734A, #FC473F)' }}>
              🪙 {user.points_fidelite ?? 0} points de fidélité
            </Badge>
          </div>
          <Button
            onClick={() => {
              logout();
              navigate("/");
              toast.success("Vous êtes déconnecté");
            }}
            variant="outline"
            className="flex items-center gap-2 transition-colors"
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
              <p className="text-3xl text-black">
                {myAnnouncements.length}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">
                Devis reçus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl" style={{ color: '#FE734A' }}>{myQuotes.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">
                Projets en cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-600">
                {myProjects.filter((p) => p.status === "en_cours").length}
              </p>
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
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      title: e.target.value,
                    })
                  }
                  placeholder="Ex: Rénovation escalier en chêne"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    id="city"
                    value={newAnnouncement.city}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        city: e.target.value,
                      })
                    }
                    placeholder="Lyon"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type de rénovation</Label>
                  <Select
                    value={newAnnouncement.renovationType}
                    onValueChange={(value) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        renovationType: value,
                      })
                    }
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
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      description: e.target.value,
                    })
                  }
                  placeholder="Décrivez votre projet en détail..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
                <Input
                  id="imageUrl"
                  value={newAnnouncement.imageUrl}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      imageUrl: e.target.value,
                    })
                  }
                  placeholder="https://..."
                />
              </div>

              <Button
                onClick={handleCreateAnnouncement}
                className="w-full text-white hover:opacity-90 transition-opacity border-0"
                style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)' }}
              >
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
                      <p className="text-sm text-muted-foreground">
                        {announcement.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${statusLabels[announcement.status].color
                          } text-white`}
                      >
                        {statusLabels[announcement.status].label}
                      </Badge>
                      {quotes.filter(
                        (q) => q.announcementId === announcement.id
                      ).length > 0 && (
                          <Badge variant="outline">
                            {
                              quotes.filter(
                                (q) => q.announcementId === announcement.id
                              ).length
                            }{" "}
                            devis
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
  const receivedAnnouncements = announcements.filter(
    (a) => a.status === "en_attente"
  );
  const myQuotes = quotes.filter((q) => q.cadreId === user.id);
  const acceptedProjects = myQuotes.filter((q) => q.accepted === true);
  const myProjects = projects.filter((p) => {
    const relatedQuote = myQuotes.find((q) => {
      const announcement = announcements.find((a) => a.id === p.announcementId);
      return (
        announcement &&
        q.announcementId === announcement.id &&
        q.accepted === true
      );
    });
    return relatedQuote !== undefined;
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageType, setNewImageType] = useState<
    "before" | "during" | "after"
  >("before");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl mb-2 text-black">
            Tableau de bord - Cadre des Compagnons
          </h1>
          <p className="text-muted-foreground">
            Bienvenue {user.firstName} {user.lastName}
          </p>
          <Badge className="mt-4 text-white border-0" style={{ background: 'linear-gradient(to right, #FE734A, #FC473F)' }}>
            🪙 {user.points_fidelite ?? 0} points de fidélité
          </Badge>
        </div>
        <Button
          onClick={() => {
            logout();
            navigate("/");
            toast.success("Vous êtes déconnecté");
          }}
          variant="outline"
          className="flex items-center gap-2 transition-colors"
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
            <p className="text-3xl text-black">
              {receivedAnnouncements.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Devis envoyés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl" style={{ color: '#FE734A' }}>{myQuotes.length}</p>
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
                    className="text-white hover:opacity-90 transition-opacity border-0"
                    style={{ background: 'linear-gradient(to top, #FE734A, #FC473F)' }}
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
      <Card className="mb-8">
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
                const announcement = announcements.find(
                  (a) => a.id === quote.announcementId
                );
                return (
                  <div
                    key={quote.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/annonce/${quote.announcementId}`)}
                  >
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{announcement?.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Montant : {quote.amount.toLocaleString("fr-FR")} €
                      </p>
                    </div>
                    <div>
                      {quote.accepted === true && (
                        <Badge className="bg-green-500 text-white">
                          Accepté
                        </Badge>
                      )}
                      {quote.accepted === false && (
                        <Badge className="bg-red-500 text-white">Refusé</Badge>
                      )}
                      {quote.accepted === undefined && (
                        <Badge className="bg-blue-500 text-white">
                          En attente
                        </Badge>
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

      {/* My Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Mes projets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myProjects.length > 0 ? (
              myProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg">{project.title}</h3>
                      <Badge
                        className={
                          project.status === "termine"
                            ? "bg-purple-500"
                            : "text-white border-0"
                        }
                        style={project.status !== "termine" ? { background: 'linear-gradient(to right, #FE734A, #FC473F)' } : {}}
                      >
                        {project.status === "termine" ? "Terminé" : "En cours"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.city} - {project.renovationType}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>Avant: {project.images.before.length}</span>
                      <span>Pendant: {project.images.during.length}</span>
                      <span>Après: {project.images.after.length}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setEditingProject(project);
                        setNewImageUrl("");
                        setNewImageType(
                          project.status === "en_cours" ? "during" : "after"
                        );
                      }}
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Modifier
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Aucun projet en cours
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Project Dialog */}
      <Dialog
        open={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le projet</DialogTitle>
            <DialogDescription>
              {editingProject?.status === "en_cours"
                ? 'Ajoutez des images "avant" ou "pendant" le projet. Pour finaliser, ajoutez les images "après" et cliquez sur "Finaliser le projet".'
                : 'Le projet est terminé. Vous pouvez toujours ajouter des images "après" si nécessaire.'}
            </DialogDescription>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-6 mt-4">
              {/* Images Before */}
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Images "Avant"
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  {editingProject.images.before.map((img, idx) => (
                    <div key={idx} className="relative group overflow-visible">
                      <img
                        src={img}
                        alt={`Avant ${idx + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      {editingProject.status === "en_cours" && (
                        <button
                          onClick={() => {
                            const newImages =
                              editingProject.images.before.filter(
                                (_, i) => i !== idx
                              );
                            updateProject(editingProject.id, {
                              images: {
                                ...editingProject.images,
                                before: newImages,
                              },
                            });
                            setEditingProject({
                              ...editingProject,
                              images: {
                                ...editingProject.images,
                                before: newImages,
                              },
                            });
                            toast.success('Image "avant" supprimée');
                          }}
                          className="absolute -top-1 -right-1 bg-white hover:bg-gray-100 text-red-600 rounded-full p-1.5 shadow-xl border-2 border-red-600 transition-all duration-200 hover:scale-110 z-50"
                          title="Supprimer l'image"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {editingProject.status === "en_cours" && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="URL de l'image"
                      value={newImageType === "before" ? newImageUrl : ""}
                      onChange={(e) => {
                        setNewImageUrl(e.target.value);
                        setNewImageType("before");
                      }}
                      onFocus={() => setNewImageType("before")}
                    />
                    <Button
                      onClick={() => {
                        if (newImageUrl) {
                          const updated = {
                            ...editingProject,
                            images: {
                              ...editingProject.images,
                              before: [
                                ...editingProject.images.before,
                                newImageUrl,
                              ],
                            },
                          };
                          updateProject(editingProject.id, {
                            images: updated.images,
                          });
                          setEditingProject(updated);
                          setNewImageUrl("");
                          toast.success('Image "avant" ajoutée');
                        }
                      }}
                      disabled={!newImageUrl}
                    >
                      Ajouter
                    </Button>
                  </div>
                )}
              </div>

              {/* Images During */}
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Images "Pendant"
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  {editingProject.images.during.map((img, idx) => (
                    <div key={idx} className="relative group overflow-visible">
                      <img
                        src={img}
                        alt={`Pendant ${idx + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      {editingProject.status === "en_cours" && (
                        <button
                          onClick={() => {
                            const newImages =
                              editingProject.images.during.filter(
                                (_, i) => i !== idx
                              );
                            updateProject(editingProject.id, {
                              images: {
                                ...editingProject.images,
                                during: newImages,
                              },
                            });
                            setEditingProject({
                              ...editingProject,
                              images: {
                                ...editingProject.images,
                                during: newImages,
                              },
                            });
                            toast.success('Image "pendant" supprimée');
                          }}
                          className="absolute -top-1 -right-1 bg-white hover:bg-gray-100 text-red-600 rounded-full p-1.5 shadow-xl border-2 border-red-600 transition-all duration-200 hover:scale-110 z-50"
                          title="Supprimer l'image"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {editingProject.status === "en_cours" && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="URL de l'image"
                      value={newImageType === "during" ? newImageUrl : ""}
                      onChange={(e) => {
                        if (newImageType === "during") {
                          setNewImageUrl(e.target.value);
                        } else {
                          setNewImageUrl(e.target.value);
                          setNewImageType("during");
                        }
                      }}
                      onFocus={() => setNewImageType("during")}
                    />
                    <Button
                      onClick={() => {
                        if (newImageUrl) {
                          const updated = {
                            ...editingProject,
                            images: {
                              ...editingProject.images,
                              during: [
                                ...editingProject.images.during,
                                newImageUrl,
                              ],
                            },
                          };
                          updateProject(editingProject.id, {
                            images: updated.images,
                          });
                          setEditingProject(updated);
                          setNewImageUrl("");
                          toast.success('Image "pendant" ajoutée');
                        }
                      }}
                      disabled={!newImageUrl}
                    >
                      Ajouter
                    </Button>
                  </div>
                )}
              </div>

              {/* Images After */}
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Images "Après"
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  {editingProject.images.after.map((img, idx) => (
                    <div key={idx} className="relative group overflow-visible">
                      <img
                        src={img}
                        alt={`Après ${idx + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        onClick={() => {
                          const newImages = editingProject.images.after.filter(
                            (_, i) => i !== idx
                          );
                          updateProject(editingProject.id, {
                            images: {
                              ...editingProject.images,
                              after: newImages,
                            },
                          });
                          setEditingProject({
                            ...editingProject,
                            images: {
                              ...editingProject.images,
                              after: newImages,
                            },
                          });
                          toast.success('Image "après" supprimée');
                        }}
                        className="absolute -top-1 -right-1 bg-white hover:bg-gray-100 text-red-600 rounded-full p-1.5 shadow-xl border-2 border-red-600 transition-all duration-200 hover:scale-110 z-50"
                        title="Supprimer l'image"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="URL de l'image finale"
                    value={newImageType === "after" ? newImageUrl : ""}
                    onChange={(e) => {
                      setNewImageUrl(e.target.value);
                      setNewImageType("after");
                    }}
                    onFocus={() => setNewImageType("after")}
                  />
                  <Button
                    onClick={() => {
                      if (newImageUrl) {
                        const updated = {
                          ...editingProject,
                          images: {
                            ...editingProject.images,
                            after: [
                              ...editingProject.images.after,
                              newImageUrl,
                            ],
                          },
                        };
                        updateProject(editingProject.id, {
                          images: updated.images,
                        });
                        setEditingProject(updated);
                        setNewImageUrl("");
                        toast.success('Image "après" ajoutée');
                      }
                    }}
                    disabled={!newImageUrl}
                  >
                    Ajouter
                  </Button>
                </div>
              </div>

              {/* Finalize Project */}
              {editingProject.status === "en_cours" && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={() => {
                      updateProject(editingProject.id, {
                        status: "termine",
                        endDate: new Date(),
                      });
                      setEditingProject(null);
                      toast.success("Projet finalisé avec succès !");
                    }}
                    className="w-full bg-purple-500 hover:bg-purple-600"
                  >
                    Finaliser le projet
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Une fois finalisé, le projet apparaîtra dans la galerie des
                    projets réalisés
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
