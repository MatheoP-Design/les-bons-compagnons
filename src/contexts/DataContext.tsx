import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Announcement,
  Quote,
  Message,
  Project,
  Review,
  Notification,
  AnnouncementStatus
} from '../types';
import { useAuth } from './AuthContext';

interface DataContextType {
  announcements: Announcement[];
  quotes: Quote[];
  messages: Message[];
  projects: Project[];
  reviews: Review[];
  notifications: Notification[];
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'userId' | 'createdAt'>) => void;
  addQuote: (quote: Omit<Quote, 'id' | 'createdAt'>) => void;
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  updateAnnouncementStatus: (announcementId: string, status: AnnouncementStatus) => void;
  acceptQuote: (quoteId: string, announcementId: string) => void;
  refuseQuote: (quoteId: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Rénovation escalier en chêne',
    description: 'Je recherche un artisan compagnon pour rénover mon escalier ancien en chêne. L\'escalier a besoin d\'un ponçage complet et d\'un nouveau vernis. Environ 15 marches.',
    city: 'Lyon',
    renovationType: 'Escalier',
    status: 'devis_envoye',
    imageUrl: 'https://images.unsplash.com/photo-1563091520-bff57a3f09ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFpcmNhc2UlMjB3b29kd29ya3xlbnwxfHx8fDE3Njc2ODg2MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    createdAt: new Date('2026-01-02'),
  },
  {
    id: '2',
    userId: 'user2',
    title: 'Restauration meuble ancien',
    description: 'Buffet familial du XIXe siècle nécessitant une restauration complète. Le bois doit être traité et les finitions refaites dans le respect des techniques traditionnelles.',
    city: 'Paris',
    renovationType: 'Meuble',
    status: 'en_attente',
    imageUrl: 'https://images.unsplash.com/photo-1572726122567-214c77bb8dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmdXJuaXR1cmUlMjByZXN0b3JhdGlvbnxlbnwxfHx8fDE3Njc2ODg2MDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    createdAt: new Date('2026-01-04'),
  },
  {
    id: '3',
    userId: 'user3',
    title: 'Rénovation toiture maison ancienne',
    description: 'Toiture d\'une maison du XVIIIe siècle à rénover. Remplacement de tuiles cassées et traitement de la charpente. Surface environ 100m².',
    city: 'Bordeaux',
    renovationType: 'Toiture',
    status: 'en_cours',
    imageUrl: 'https://images.unsplash.com/photo-1763665814485-a0a1b6f51ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwcmVub3ZhdGlvbiUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3Njc2MTI0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    createdAt: new Date('2025-12-28'),
  },
  {
    id: '4',
    userId: 'user4',
    title: 'Parquet ancien à restaurer',
    description: 'Parquet en chêne massif d\'un appartement haussmannien. Nécessite ponçage, traitement et finition huilée. Surface de 45m².',
    city: 'Toulouse',
    renovationType: 'Parquet',
    status: 'termine',
    imageUrl: 'https://images.unsplash.com/photo-1646592491550-6ef7a11ecc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NzY1ODUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    createdAt: new Date('2025-12-15'),
  },
  {
    id: '5',
    userId: 'user1',
    title: 'Restauration charpente en bois',
    description: 'Charpente d\'une grange ancienne nécessitant une restauration complète. Travail de charpenterie traditionnelle requis.',
    city: 'Lyon',
    renovationType: 'Charpente',
    status: 'en_attente',
    imageUrl: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    createdAt: new Date('2026-01-10'),
  },
  {
    id: '6',
    userId: 'user2',
    title: 'Rénovation cheminée ancienne',
    description: 'Cheminée en pierre à restaurer avec reconstruction du manteau et rénovation des conduits.',
    city: 'Paris',
    renovationType: 'Monument',
    status: 'devis_envoye',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    createdAt: new Date('2026-01-08'),
  },
];

const mockQuotes: Quote[] = [
  {
    id: 'q1',
    announcementId: '1',
    cadreId: 'cadre1',
    cadreName: 'Jean Dupont',
    amount: 2500,
    description: 'Devis pour la rénovation complète de l\'escalier en chêne incluant ponçage, traitement et application de trois couches de vernis.',
    estimatedDuration: '3-4 jours',
    createdAt: new Date('2026-01-03'),
  },
  {
    id: 'q2',
    announcementId: '3',
    cadreId: 'cadre3',
    cadreName: 'Michel Garnier',
    amount: 8500,
    description: 'Devis pour rénovation complète de la toiture : remplacement des tuiles endommagées, traitement de la charpente, réfection des solins et joints.',
    estimatedDuration: '2-3 semaines',
    createdAt: new Date('2025-12-29'),
    accepted: true,
  },
  {
    id: 'q3',
    announcementId: '4',
    cadreId: 'cadre1',
    cadreName: 'Jean Dupont',
    amount: 3200,
    description: 'Restauration du parquet en chêne : ponçage complet, traitement anti-parasites, application de finition huilée naturelle.',
    estimatedDuration: '1 semaine',
    createdAt: new Date('2025-12-16'),
    accepted: true,
  },
  {
    id: 'q4',
    announcementId: '6',
    cadreId: 'cadre2',
    cadreName: 'Paul Lefebvre',
    amount: 4200,
    description: 'Restauration complète de la cheminée : démontage et remontage du manteau, réfection des conduits, enduit traditionnel.',
    estimatedDuration: '2 semaines',
    createdAt: new Date('2026-01-09'),
  },
];

const mockMessages: Message[] = [
  {
    id: 'm1',
    announcementId: '1',
    senderId: 'cadre1',
    senderName: 'Jean Dupont',
    content: 'Bonjour, j\'ai bien reçu votre demande. Je peux me déplacer pour évaluer les travaux cette semaine.',
    createdAt: new Date('2026-01-03T10:30:00'),
  },
  {
    id: 'm2',
    announcementId: '1',
    senderId: 'user1',
    senderName: 'Sophie Bernard',
    content: 'Parfait, pouvez-vous venir mercredi après-midi ?',
    createdAt: new Date('2026-01-03T14:20:00'),
  },
  {
    id: 'm3',
    announcementId: '3',
    senderId: 'cadre3',
    senderName: 'Michel Garnier',
    content: 'Les travaux de toiture sont en cours. La charpente est en bon état, nous commençons le remplacement des tuiles.',
    createdAt: new Date('2026-01-05T09:15:00'),
  },
  {
    id: 'm4',
    announcementId: '4',
    senderId: 'cadre1',
    senderName: 'Jean Dupont',
    content: 'Le parquet est maintenant terminé ! Il est prêt pour la visite.',
    createdAt: new Date('2025-12-27T16:45:00'),
  },
];

const mockProjects: Project[] = [
  {
    id: 'p1',
    announcementId: '3',
    cadreId: 'cadre3',
    title: 'Rénovation toiture maison ancienne',
    description: 'Rénovation complète de la toiture avec remplacement des tuiles endommagées et traitement de la charpente.',
    city: 'Bordeaux',
    renovationType: 'Toiture',
    images: {
      before: [
        'https://images.unsplash.com/photo-1763665814485-a0a1b6f51ed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwcmVub3ZhdGlvbiUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3Njc2MTI0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1590725140246-20acdee442be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      ],
      during: [
        'https://images.unsplash.com/photo-1687818800037-325ba3b2752a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGNhcnBlbnRyeSUyMHRvb2xzfGVufDF8fHx8MTc2NzY4ODYwOHww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      ],
      after: [],
    },
    startDate: new Date('2026-01-02'),
    status: 'en_cours',
  },
  {
    id: 'p2',
    announcementId: '4',
    cadreId: 'cadre1',
    title: 'Parquet ancien restauré',
    description: 'Restauration complète du parquet en chêne massif avec finition huilée.',
    city: 'Toulouse',
    renovationType: 'Parquet',
    images: {
      before: [
        'https://images.unsplash.com/photo-1646592491550-6ef7a11ecc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NzY1ODUyN3ww&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      during: [
        'https://images.unsplash.com/photo-1661446520690-b92b30acf318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjB3b29kd29yayUyMHJlbm92YXRpb258ZW58MXx8fHwxNzY3Njg4NjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      ],
      after: [
        'https://images.unsplash.com/photo-1646592491550-6ef7a11ecc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwcmVub3ZhdGlvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2NzY1ODUyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
      ],
    },
    startDate: new Date('2025-12-18'),
    endDate: new Date('2025-12-28'),
    status: 'termine',
  },
];

const mockReviews: Review[] = [
  {
    id: 'r1',
    projectId: 'p2',
    userId: 'user4',
    userName: 'Lucas Moreau',
    rating: 5,
    comment: 'Travail exceptionnel ! Le parquet est magnifique, on dirait qu\'il est neuf. L\'artisan a fait preuve d\'un grand professionnalisme.',
    createdAt: new Date('2025-12-30'),
  },
  {
    id: 'r2',
    projectId: 'p2',
    userId: 'user4',
    userName: 'Lucas Moreau',
    rating: 5,
    comment: 'Très satisfait du résultat final. Les finitions sont impeccables.',
    createdAt: new Date('2025-12-31'),
  },
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  // Helper function to load data from localStorage or use mock data
  const loadData = <T,>(key: string, mockData: T[]): T[] => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        return parsed.map((item: any) => {
          if (item.createdAt) item.createdAt = new Date(item.createdAt);
          if (item.startDate) item.startDate = new Date(item.startDate);
          if (item.endDate) item.endDate = new Date(item.endDate);
          return item;
        });
      }
    } catch (e) {
      console.error(`Error loading ${key} from localStorage:`, e);
    }
    return mockData;
  };

  // Helper function to save data to localStorage
  const saveData = <T,>(key: string, data: T[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving ${key} to localStorage:`, e);
    }
  };

  // Load initial data from localStorage or use mock data
  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    loadData('app_announcements', mockAnnouncements)
  );
  const [quotes, setQuotes] = useState<Quote[]>(() =>
    loadData('app_quotes', mockQuotes)
  );
  const [messages, setMessages] = useState<Message[]>(() =>
    loadData('app_messages', mockMessages)
  );
  const [projects, setProjects] = useState<Project[]>(() =>
    loadData('app_projects', mockProjects)
  );
  const [reviews, setReviews] = useState<Review[]>(() =>
    loadData('app_reviews', mockReviews)
  );
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    loadData('app_notifications', [])
  );

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveData('app_announcements', announcements);
  }, [announcements]);

  useEffect(() => {
    saveData('app_quotes', quotes);
  }, [quotes]);

  useEffect(() => {
    saveData('app_messages', messages);
  }, [messages]);

  useEffect(() => {
    saveData('app_projects', projects);
  }, [projects]);

  useEffect(() => {
    saveData('app_reviews', reviews);
  }, [reviews]);

  useEffect(() => {
    saveData('app_notifications', notifications);
  }, [notifications]);

  const addAnnouncement = (announcement: Omit<Announcement, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const newAnnouncement: Announcement = {
      ...announcement,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date(),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
  };

  const addQuote = (quote: Omit<Quote, 'id' | 'createdAt'>) => {
    const newQuote: Quote = {
      ...quote,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setQuotes([...quotes, newQuote]);

    // Update announcement status
    setAnnouncements(announcements.map(a =>
      a.id === quote.announcementId ? { ...a, status: 'devis_envoye' } : a
    ));

    // Add notification for the user who created the announcement
    const announcement = announcements.find(a => a.id === quote.announcementId);
    if (announcement) {
      addNotification({
        userId: announcement.userId,
        type: 'quote',
        title: 'Nouveau devis reçu',
        message: `Vous avez reçu un devis de ${quote.cadreName} pour "${announcement.title}"`,
        read: false,
        relatedId: quote.announcementId,
      });
    }
  };

  const addMessage = (message: Omit<Message, 'id' | 'createdAt'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setMessages([...messages, newMessage]);

    // Add notification for the recipient
    const announcement = announcements.find(a => a.id === message.announcementId);
    if (announcement && announcement.userId !== message.senderId) {
      addNotification({
        userId: announcement.userId,
        type: 'message',
        title: 'Nouveau message',
        message: `${message.senderName} vous a envoyé un message`,
        read: false,
        relatedId: message.announcementId,
      });
    }
  };

  const updateAnnouncementStatus = (announcementId: string, status: AnnouncementStatus) => {
    setAnnouncements(announcements.map(a =>
      a.id === announcementId ? { ...a, status } : a
    ));
  };

  const acceptQuote = (quoteId: string, announcementId: string) => {
    setQuotes(quotes.map(q =>
      q.id === quoteId ? { ...q, accepted: true } : q
    ));

    updateAnnouncementStatus(announcementId, 'en_cours');

    const quote = quotes.find(q => q.id === quoteId);
    if (quote) {
      addNotification({
        userId: quote.cadreId,
        type: 'acceptance',
        title: 'Devis accepté',
        message: 'Votre devis a été accepté, le projet peut commencer',
        read: false,
        relatedId: announcementId,
      });

      // Create project
      const announcement = announcements.find(a => a.id === announcementId);
      if (announcement) {
        const newProject: Project = {
          id: Date.now().toString(),
          announcementId: announcement.id,
          cadreId: quote.cadreId,
          title: announcement.title,
          description: announcement.description,
          city: announcement.city,
          renovationType: announcement.renovationType,
          images: {
            before: [announcement.imageUrl],
            during: [],
            after: [],
          },
          startDate: new Date(),
          status: 'en_cours',
        };
        setProjects([...projects, newProject]);
      }
    }
  };

  const refuseQuote = (quoteId: string) => {
    setQuotes(quotes.map(q =>
      q.id === quoteId ? { ...q, accepted: false } : q
    ));
  };

  const addReview = (review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setReviews([...reviews, newReview]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    setNotifications([newNotification, ...notifications]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, ...updates } : p
    ));
  };

  return (
    <DataContext.Provider
      value={{
        announcements,
        quotes,
        messages,
        projects,
        reviews,
        notifications,
        addAnnouncement,
        addQuote,
        addMessage,
        updateAnnouncementStatus,
        acceptQuote,
        refuseQuote,
        addReview,
        markNotificationAsRead,
        addNotification,
        updateProject,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}