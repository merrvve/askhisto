import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  docData, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  DocumentReference,
  increment
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Comment } from 'src/app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private firestore: Firestore) {}

  // Get all comments for a specific post
  getCommentsByPostId(postId: string): Observable<Comment[]> {
    const commentsRef = collection(this.firestore, 'comments');
    const q = query(
      commentsRef, 
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );
    
    return collectionData(q, { idField: 'id' }).pipe(
      map(comments => comments.map(comment => this.convertTimestamps(comment)))
    ) as Observable<Comment[]>;
  }

  // Get a single comment by ID
  getCommentById(commentId: string): Observable<Comment | undefined> {
    const commentRef = doc(this.firestore, `comments/${commentId}`);
    return docData(commentRef, { idField: 'id' }).pipe(
      map(comment => comment ? this.convertTimestamps(comment) : undefined)
    ) as Observable<Comment>;
  }

  // Create a new comment
  createComment(comment: Omit<Comment, 'id' | 'createdAt'>): Observable<Comment> {
    const commentsRef = collection(this.firestore, 'comments');
    const newComment = {
      ...comment,
      createdAt: serverTimestamp(),
      upvotes: comment.upvotes || 0
    };
    
    return from(addDoc(commentsRef, newComment)).pipe(
      map((docRef: DocumentReference) => ({
        ...newComment,
        id: docRef.id,
        createdAt: new Date() // Local fallback until server timestamp arrives
      }))
    );
  }

  // Update a comment
  updateComment(commentId: string, updates: Partial<Comment>): Observable<void> {
    const commentRef = doc(this.firestore, `comments/${commentId}`);
    const updateData = {
      ...updates,
      editedAt: serverTimestamp()
    };
    return from(updateDoc(commentRef, updateData));
  }

  // Delete a comment
  deleteComment(commentId: string): Observable<void> {
    const commentRef = doc(this.firestore, `comments/${commentId}`);
    return from(deleteDoc(commentRef));
  }

  // Upvote a comment
  upvoteComment(commentId: string): Observable<void> {
    const commentRef = doc(this.firestore, `comments/${commentId}`);
    return from(updateDoc(commentRef, {
      upvotes: increment(1)
    }));
  }

  // Helper to convert Firestore Timestamps to Date objects
  private convertTimestamps(comment: any): Comment {
    return {
      ...comment,
      createdAt: comment.createdAt?.toDate() ?? new Date(),
      editedAt: comment.editedAt?.toDate()
    };
  }
}