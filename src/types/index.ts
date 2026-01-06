export type AnnouncementStatus = 
  | 'en_attente' 
  | 'devis_envoye' 
  | 'accepte' 
  | 'refuse' 
  | 'en_cours' 
  | 'termine';

export interface Announcement {
  id: string;
  userId: string;
  title: string;
  description: string;
  city: string;
  renovationType: string;
  status: AnnouncementStatus;
  imageUrl: string;
  createdAt: Date;
}

export interface Quote {
  id: string;
  announcementId: string;
  cadreId: string;
  cadreName: string;
  amount: number;
  description: string;
  estimatedDuration: string;
  createdAt: Date;
  accepted?: boolean;
}

export interface Message {
  id: string;
  announcementId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  announcementId: string;
  cadreId: string;
  title: string;
  description: string;
  city: string;
  renovationType: string;
  images: {
    before: string[];
    during: string[];
    after: string[];
  };
  startDate: Date;
  endDate?: Date;
  status: 'en_cours' | 'termine';
}

export interface Review {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'quote' | 'message' | 'acceptance' | 'project';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  relatedId?: string;
}
