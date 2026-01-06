import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { User, MessageCircle, Image as ImageIcon, Send, Clock, Search, X, Edit, Trash2, Check, XCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function PostCard({ post, onReply, onEdit, onDelete, onEditReply, onDeleteReply, currentUser }) {
  const [reply, setReply] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editedReplyContent, setEditedReplyContent] = useState("");
  
  const isAuthor = currentUser && `${currentUser.firstName} ${currentUser.lastName}` === post.author;
  
  const isReplyAuthor = (replyAuthor: string) => {
    return currentUser && `${currentUser.firstName} ${currentUser.lastName}` === replyAuthor;
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow border-2 border-transparent hover:border-[#FF8C42]">
      <CardContent className="p-6 space-y-4">
        {/* Auteur */}
        <div className="flex items-center justify-between pb-3 border-b">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C42]/10 border-2 border-[#FF8C42]/20">
              <User className="h-5 w-5 text-[#FF8C42]" />
            </div>
            <div>
              <span className="font-semibold text-[#2C5F8D]">{post.author}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <Clock className="h-3 w-3" />
                <span>{post.createdAt}</span>
              </div>
            </div>
          </div>
          {isAuthor && !isEditing && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setEditedContent(post.content);
                }}
                className="h-8 w-8 p-0 text-[#2C5F8D] hover:text-[#FF8C42]"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
                    onDelete(post.id);
                  }
                }}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Contenu */}
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(post.content);
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (editedContent.trim()) {
                    onEdit(post.id, editedContent);
                    setIsEditing(false);
                  }
                }}
                disabled={!editedContent.trim()}
                className="bg-[#FF8C42] hover:bg-[#FF8C42]/90"
              >
                <Check className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        )}

        {post.image && (
          <div className="rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={post.image}
              alt=""
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}

        {/* Réponses */}
        {post.replies.length > 0 && (
          <div className="space-y-3 pt-3 border-t bg-gray-50/50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#2C5F8D] mb-2">
              {post.replies.length} {post.replies.length === 1 ? 'réponse' : 'réponses'}
            </h4>
            {post.replies.map((replyItem) => (
              <div
                key={replyItem.id}
                className="pl-4 border-l-2 border-[#FF8C42]/30 bg-white rounded p-3 relative"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-[#FF8C42]" />
                    <strong className="text-sm text-[#2C5F8D]">{replyItem.author}</strong>
                  </div>
                  {isReplyAuthor(replyItem.author) && editingReplyId !== replyItem.id && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingReplyId(replyItem.id);
                          setEditedReplyContent(replyItem.content);
                        }}
                        className="h-6 w-6 p-0 text-[#2C5F8D] hover:text-[#FF8C42]"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réponse ?')) {
                            onDeleteReply(post.id, replyItem.id);
                          }
                        }}
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
                {editingReplyId === replyItem.id ? (
                  <div className="space-y-2 mt-2">
                    <Textarea
                      value={editedReplyContent}
                      onChange={(e) => setEditedReplyContent(e.target.value)}
                      className="min-h-[60px] resize-none text-sm"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingReplyId(null);
                          setEditedReplyContent("");
                        }}
                        className="h-7 text-xs"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (editedReplyContent.trim()) {
                            onEditReply(post.id, replyItem.id, editedReplyContent);
                            setEditingReplyId(null);
                            setEditedReplyContent("");
                          }
                        }}
                        disabled={!editedReplyContent.trim()}
                        className="bg-[#FF8C42] hover:bg-[#FF8C42]/90 h-7 text-xs"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">{replyItem.content}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Répondre */}
        <div className="flex gap-2 pt-3 border-t">
          <Textarea
            placeholder="Écrire une réponse..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="text-sm min-h-[80px] resize-none"
          />
          <Button
            size="sm"
            onClick={() => {
              onReply(post.id, reply);
              setReply("");
            }}
            disabled={!reply.trim()}
            className="bg-[#FF8C42] hover:bg-[#FF8C42]/90 h-auto px-4"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CommunityPage() {
  // Simulation utilisateur connecté
  const { user } = useAuth();

  // Helper function to load posts from localStorage or use default
  const loadPosts = () => {
    try {
      const saved = localStorage.getItem('community_posts');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading posts from localStorage:', e);
    }
    // Default posts
    return [
      {
        id: 1,
        author: "Jean Dubois",
        content: "Quelqu'un a déjà rénové une maison en pierre ?",
        image: null,
        replies: [
          { id: 1, author: "Marie Lepaul", content: "Oui, attention à l'humidité." },
        ],
        createdAt: "Il y a 2h",
      },
    ];
  };

  // Helper function to save posts to localStorage
  const savePosts = (postsToSave: any[]) => {
    try {
      localStorage.setItem('community_posts', JSON.stringify(postsToSave));
    } catch (e) {
      console.error('Error saving posts to localStorage:', e);
    }
  };

  const [posts, setPosts] = useState(loadPosts);
  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Save posts to localStorage whenever they change
  useEffect(() => {
    savePosts(posts);
  }, [posts]);

  const handleCreatePost = () => {
    if (!newPost.trim() || !user) return;

    const newPostData = {
      id: Date.now(),
      author: `${user.firstName} ${user.lastName}`,
      content: newPost,
      image: newImage,
      replies: [],
      createdAt: "À l'instant",
    };

    const updatedPosts = [newPostData, ...posts];
    setPosts(updatedPosts);
    setNewPost("");
    setNewImage(null);
  };

  const handleReply = (postId: number, replyContent: string) => {
    if (!replyContent.trim() || !user) return;

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: [
              ...post.replies,
              {
                id: Date.now(),
                author: `${user.firstName} ${user.lastName}`,
                content: replyContent,
              },
            ],
          }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleEditPost = (postId: number, newContent: string) => {
    if (!newContent.trim()) return;

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            content: newContent,
          }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleEditReply = (postId: number, replyId: number, newContent: string) => {
    if (!newContent.trim()) return;

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: post.replies.map((reply) =>
              reply.id === replyId
                ? { ...reply, content: newContent }
                : reply
            ),
          }
        : post
    );
    setPosts(updatedPosts);
  };

  const handleDeleteReply = (postId: number, replyId: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            replies: post.replies.filter((reply) => reply.id !== replyId),
          }
        : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Titre */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl mb-3 text-[#2C5F8D] font-bold">
          Communauté
        </h1>
        <p className="text-muted-foreground text-lg">
          Échangez librement avec les autres membres de la communauté
        </p>
      </div>

      {/* Barre de recherche */}
      <Card className="mb-6 shadow-md">
        <CardContent className="p-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher dans les messages, auteurs, réponses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10"
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 text-muted-foreground hover:text-[#FF8C42] transition-colors z-10"
                style={{ top: '50%', transform: 'translateY(-50%)', right: '12px' }}
              >
                <X className="h-5 w-5" />
              </button>
            ) : (
              <Search 
                className="absolute h-5 w-5 text-muted-foreground pointer-events-none" 
                style={{ top: '50%', transform: 'translateY(-50%)', right: '12px' }}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Création de post */}
      <Card className="mb-8 shadow-lg border-2 border-[#FF8C42]/20 bg-gradient-to-br from-white to-[#FF8C42]/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C42]/10 border-2 border-[#FF8C42]/20">
              <User className="h-5 w-5 text-[#FF8C42]" />
            </div>
            <div>
              <p className="font-semibold text-[#2C5F8D]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">Publier un message</p>
            </div>
          </div>
          
          <Textarea
            placeholder="Qu'est-ce qui vous passe par la tête ? Partagez vos expériences, posez vos questions..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[120px] resize-none text-base"
          />

          {newImage && (
            <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={newImage}
                alt="Preview"
                className="w-full max-h-64 object-cover"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setNewImage(null)}
              >
                ×
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-[#FF8C42] transition-colors">
              <ImageIcon className="h-5 w-5" />
              <span>Ajouter une image</span>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setNewImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="hidden"
              />
            </label>
            
            <Button 
              onClick={handleCreatePost}
              disabled={!newPost.trim()}
              className="bg-[#FF8C42] hover:bg-[#FF8C42]/90 px-6"
            >
              <Send className="h-4 w-4 mr-2" />
              Publier
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-6">
        {(() => {
          // Filtrer les posts selon le terme de recherche
          const filteredPosts = posts.filter((post) => {
            if (!searchTerm.trim()) return true;
            
            const searchLower = searchTerm.toLowerCase();
            const matchesContent = post.content.toLowerCase().includes(searchLower);
            const matchesAuthor = post.author.toLowerCase().includes(searchLower);
            const matchesReplies = post.replies.some(
              (reply) =>
                reply.content.toLowerCase().includes(searchLower) ||
                reply.author.toLowerCase().includes(searchLower)
            );
            
            return matchesContent || matchesAuthor || matchesReplies;
          });

          if (filteredPosts.length > 0) {
            return filteredPosts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onReply={handleReply}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onEditReply={handleEditReply}
                onDeleteReply={handleDeleteReply}
                currentUser={user}
              />
            ));
          } else if (searchTerm.trim()) {
            return (
              <Card className="p-12 text-center">
                <CardContent>
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Aucun résultat trouvé pour "{searchTerm}"
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                    className="mt-4"
                  >
                    Effacer la recherche
                  </Button>
                </CardContent>
              </Card>
            );
          } else {
            return (
              <Card className="p-12 text-center">
                <CardContent>
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Aucun message pour le moment. Soyez le premier à publier !
                  </p>
                </CardContent>
              </Card>
            );
          }
        })()}
      </div>
    </div>
  );
}
