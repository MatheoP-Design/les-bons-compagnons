import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, MessageSquare, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner@2.0.3';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const statusLabels: Record<string, { label: string; color: string }> = {
  en_attente: { label: 'En attente', color: 'bg-gray-500' },
  devis_envoye: { label: 'Devis envoyé', color: 'bg-blue-500' },
  accepte: { label: 'Accepté', color: 'bg-green-500' },
  refuse: { label: 'Refusé', color: 'bg-red-500' },
  en_cours: { label: 'En cours', color: 'bg-[#FF8C42]' },
  termine: { label: 'Terminé', color: 'bg-purple-500' },
};

export function AnnouncementDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { announcements, quotes, messages, addQuote, addMessage, acceptQuote, refuseQuote } = useData();

  const [quoteForm, setQuoteForm] = useState({
    amount: '',
    description: '',
    estimatedDuration: '',
  });

  const [messageContent, setMessageContent] = useState('');
  const [refusalMessage, setRefusalMessage] = useState('');

  const announcement = announcements.find(a => a.id === id);
  const announcementQuotes = quotes.filter(q => q.announcementId === id);
  const announcementMessages = messages.filter(m => m.announcementId === id);

  // Trouver le devis accepté
  const acceptedQuote = announcementQuotes.find(q => q.accepted === true);

  // Vérifier si l'utilisateur peut accéder à la messagerie
  const canAccessMessaging = isAuthenticated && acceptedQuote && (
    // Le particulier qui a créé l'annonce
    (user?.id === announcement?.userId) ||
    // Le cadre dont le devis a été accepté
    (user?.id === acceptedQuote.cadreId)
  );

  if (!announcement) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Annonce introuvable</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendQuote = () => {
    if (!user || user.role !== 'cadre') return;

    addQuote({
      announcementId: announcement.id,
      cadreId: user.id,
      cadreName: `${user.firstName} ${user.lastName}`,
      amount: parseFloat(quoteForm.amount),
      description: quoteForm.description,
      estimatedDuration: quoteForm.estimatedDuration,
    });

    toast.success('Devis envoyé avec succès');
    setQuoteForm({ amount: '', description: '', estimatedDuration: '' });
  };

  const handleSendMessage = () => {
    if (!user || !messageContent.trim()) return;

    addMessage({
      announcementId: announcement.id,
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      content: messageContent,
    });

    toast.success('Message envoyé');
    setMessageContent('');
  };

  const handleRefuseRequest = () => {
    if (!user || user.role !== 'cadre' || !refusalMessage.trim()) return;

    addMessage({
      announcementId: announcement.id,
      senderId: user.id,
      senderName: `${user.firstName} ${user.lastName}`,
      content: `Demande refusée : ${refusalMessage}`,
    });

    toast.success('Message de refus envoyé');
    setRefusalMessage('');
  };

  const handleAcceptQuote = (quoteId: string) => {
    acceptQuote(quoteId, announcement.id);
    toast.success('Devis accepté ! Le projet va commencer.');
    navigate('/tableau-de-bord');
  };

  const handleRefuseQuote = (quoteId: string) => {
    refuseQuote(quoteId);
    toast.success('Devis refusé');
  };

  const isOwner = user?.id === announcement.userId;
  const isCadre = user?.role === 'cadre';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Announcement Details */}
        <Card>
          <CardContent className="p-0">
            <img
              src={announcement.imageUrl}
              alt={announcement.title}
              className="w-full h-32 md:h-40 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl text-[#2C5F8D]">{announcement.title}</h1>
                <Badge className={`${statusLabels[announcement.status].color} text-white`}>
                  {statusLabels[announcement.status].label}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
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

              <div className="prose max-w-none">
                <p className="text-foreground">{announcement.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quotes Section */}
        {announcementQuotes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Devis reçus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcementQuotes.map((quote) => (
                <div key={quote.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg">{quote.cadreName}</h3>
                      <p className="text-2xl text-[#FF8C42]">{quote.amount.toLocaleString('fr-FR')} €</p>
                    </div>
                    {isOwner && quote.accepted === undefined && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAcceptQuote(quote.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Accepter
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRefuseQuote(quote.id)}
                        >
                          Refuser
                        </Button>
                      </div>
                    )}
                    {quote.accepted === true && (
                      <Badge className="bg-green-500 text-white">Accepté</Badge>
                    )}
                    {quote.accepted === false && (
                      <Badge className="bg-red-500 text-white">Refusé</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Durée estimée : {quote.estimatedDuration}
                  </p>
                  <p className="text-sm">{quote.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Cadre Actions */}
        {isCadre && announcement.status === 'en_attente' && (
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                    <FileText className="mr-2 h-4 w-4" />
                    Envoyer un devis
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Créer un devis</DialogTitle>
                    <DialogDescription>
                      Envoyez votre proposition au particulier
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Montant (€)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={quoteForm.amount}
                        onChange={(e) => setQuoteForm({ ...quoteForm, amount: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée estimée</Label>
                      <Input
                        id="duration"
                        placeholder="ex: 3-4 jours"
                        value={quoteForm.estimatedDuration}
                        onChange={(e) => setQuoteForm({ ...quoteForm, estimatedDuration: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={quoteForm.description}
                        onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button onClick={handleSendQuote} className="w-full bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                      Envoyer le devis
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Refuser la demande
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Refuser la demande</DialogTitle>
                    <DialogDescription>
                      Expliquez la raison de votre refus
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea
                      value={refusalMessage}
                      onChange={(e) => setRefusalMessage(e.target.value)}
                      placeholder="Raison du refus..."
                      rows={4}
                    />
                    <Button onClick={handleRefuseRequest} variant="destructive" className="w-full">
                      Envoyer le refus
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        {/* Messages */}
        {canAccessMessaging && (
          <Card>
            <CardHeader>
              <CardTitle>
                <MessageSquare className="inline mr-2 h-5 w-5" />
                Messagerie
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {announcementMessages.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Aucun message pour le moment
                  </p>
                ) : (
                  announcementMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg ${message.senderId === user?.id ? 'bg-[#FF8C42]/10 ml-auto max-w-[80%]' : 'bg-gray-100 mr-auto max-w-[80%]'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{message.senderName}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Écrivez votre message..."
                  rows={2}
                />
                <Button onClick={handleSendMessage} className="bg-[#2C5F8D] hover:bg-[#2C5F8D]/90">
                  Envoyer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!isAuthenticated && (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="mb-4">Connectez-vous pour envoyer un devis ou un message</p>
              <Button onClick={() => navigate('/connexion')} className="bg-[#FF8C42] hover:bg-[#FF8C42]/90">
                Se connecter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}