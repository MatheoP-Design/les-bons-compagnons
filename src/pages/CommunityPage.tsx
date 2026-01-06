import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { User, MessageCircle } from "lucide-react";
function PostCard({ post, onReply }) {
  const [reply, setReply] = useState("");

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Auteur */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{post.author}</span>
            <Badge variant="outline">{post.createdAt}</Badge>
          </div>
        </div>

        {/* Contenu */}
        <p>{post.content}</p>

        {post.image && (
          <img
            src={post.image}
            alt=""
            className="rounded-lg max-h-96 object-cover"
          />
        )}

        {/* Réponses */}
        <div className="space-y-3">
          {post.replies.map((reply) => (
            <div
              key={reply.id}
              className="pl-4 border-l text-sm text-muted-foreground"
            >
              <strong>{reply.author} :</strong> {reply.content}
            </div>
          ))}
        </div>

        {/* Répondre */}
        <div className="flex gap-2">
          <Textarea
            placeholder="Répondre..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="text-sm"
          />
          <Button
            size="sm"
            onClick={() => {
              onReply(post.id, reply);
              setReply("");
            }}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CommunityPage() {
  // Simulation utilisateur connecté
  const user = { id: 1, name: "Mike" };

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Jean",
      content: "Quelqu’un a déjà rénové une maison en pierre ?",
      image: null,
      replies: [
        { id: 1, author: "Marie", content: "Oui, attention à l’humidité." },
      ],
      createdAt: "Il y a 2h",
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    setPosts([
      {
        id: Date.now(),
        author: user.name,
        content: newPost,
        image: newImage,
        replies: [],
        createdAt: "À l’instant",
      },
      ...posts,
    ]);

    setNewPost("");
    setNewImage(null);
  };

  const handleReply = (postId, replyContent) => {
    if (!replyContent.trim()) return;

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              replies: [
                ...post.replies,
                {
                  id: Date.now(),
                  author: user.name,
                  content: replyContent,
                },
              ],
            }
          : post
      )
    );
  };

  return (
    <div className="container px-4 py-8 max-w-4xl mx-auto">
      {/* Titre */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl mb-2 text-[#2C5F8D]">Communauté</h1>
        <p className="text-muted-foreground">
          Échangez librement avec les autres membres
        </p>
      </div>

      {/* Création de post */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <Textarea
            placeholder="Écrire un message..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewImage(URL.createObjectURL(e.target.files[0]))
            }
          />

          <Button onClick={handleCreatePost}>Publier</Button>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}
