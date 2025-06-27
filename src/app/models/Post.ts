import { Timestamp } from "firebase/firestore";

export interface Post {
  id?: string; // Optional Firebase document ID
  content: string;
  images: string[]; // URLs or Firebase storage paths
  subjects?: string[]; // e.g., ['Anatomy', 'Physiology']
  tags?: string[];
  stainingMethods?: string[]; // e.g., ['H&E', 'Gram']
  addedById: string; // User ID
  addedByName: string;
  addedDate: Date | Timestamp; // Firestore Timestamp or ISO date
  approved: boolean;
}
