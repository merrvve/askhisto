export interface Question {
  id?: string; // Optional Firebase document ID
  type: 'whichTissue' | 'whichStructure' | string;
  images: string[]; // URLs or Firebase storage paths
  choices: string[]; // Array of answer choices
  rightChoice: number; // Index of the correct choice
  subjects: string[]; // e.g., ['Anatomy', 'Physiology']
  tags: string[];
  stainingMethods: string[]; // e.g., ['H&E', 'Gram']
  addedBy: string; // User ID or name
  addedDate: Date | string; // Firestore Timestamp or ISO date
}
