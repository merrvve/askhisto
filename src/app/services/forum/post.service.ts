import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Timestamp, serverTimestamp } from 'firebase/firestore';
import { Post } from 'src/app/models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 
  private firestore: Firestore = inject(Firestore);
  private postsCollection = collection(this.firestore, 'posts');
  public currentPost?: Post;

  constructor() {}

  // Create Post
  async addPost(post: Post): Promise<void> {
    const postToSave = {
      ...post,
      addedDate: serverTimestamp() // store server time
    };

    await addDoc(this.postsCollection, postToSave);
  }

  // Get All Posts (Observable)
  getPosts(): Observable<Post[]> {
    return collectionData(this.postsCollection, { idField: 'id' }) as Observable<Post[]>;
  }

  // Get Single Post by ID (Observable)
  getPostById(id: string): Observable<Post> {
    const postDoc = doc(this.firestore, `posts/${id}`);
    return docData(postDoc, { idField: 'id' }) as Observable<Post>;
  }

  // Update Post
  async updatePost(id: string, post: Partial<Post>): Promise<void> {
    const postDoc = doc(this.firestore, `posts/${id}`);
    await updateDoc(postDoc, { ...post });
  }

  // Delete Post
  async deletePost(id: string): Promise<void> {
    const postDoc = doc(this.firestore, `posts/${id}`);
    await deleteDoc(postDoc);
  }

  // Query Example: Get posts of specific type
  getPostsByType(type: string): Observable<Post[]> {
    const q = query(this.postsCollection, where('type', '==', type), orderBy('addedDate', 'desc'), limit(20));
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }

  getLatestPosts(limitCount: number = 5): Observable<Post[]> {
  const q = query(
    this.postsCollection,
    orderBy('addedDate', 'desc'),
    limit(limitCount)
  );
  return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
}

  getCurrentPostMatchId(id: string): Post | null {
    if(this.currentPost && this.currentPost.id === id) {
      return this.currentPost;
    }
    else {
      return null;
    }
  }
}
