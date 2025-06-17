import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({ name: 'firebaseDate' })
export class FirebaseDatePipe implements PipeTransform {
  transform(timestamp: Timestamp | Date | undefined, format: string = 'shortDate'): string {
    if (!timestamp) return '';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return new Date(date).toLocaleDateString();
  }
}