import { Timestamp } from "firebase/firestore";

export interface Comment {
  id?: string; // Optional Firebase document ID
  postId: string; // ID of the related Post
  content: string; // The comment text
  authorId: string; // User ID or name of the commenter
  authorName?: string; // Optional display name
  createdAt: Date | Timestamp; // Creation date
  editedAt?: Date | Timestamp; // Optional last edited date
  upvotes?: number; // Optional voting system
  replies?: Comment[]; // Optional nested replies
}
