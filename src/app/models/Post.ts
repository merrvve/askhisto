export interface Post {
  id?: string; // Optional Firebase document ID
  type: 'whichTissue' | 'whichStructure' | string;
  content: string;
  images: string[]; // URLs or Firebase storage paths
  subjects?: string[]; // e.g., ['Anatomy', 'Physiology']
  tags?: string[];
  stainingMethods?: string[]; // e.g., ['H&E', 'Gram']
  addedBy: string; // User ID or name
  addedDate: Date | string; // Firestore Timestamp or ISO date
}
