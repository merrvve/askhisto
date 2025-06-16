import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonItem, IonLabel, IonButton, IonSelectOption, IonInput, IonChip, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.page.html',
  styleUrls: ['./ask-question.page.scss'],
  standalone: true,
  imports: [IonIcon, IonChip, IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule,
    IonSelectOption, IonInput, IonSelect
  ]
})
export class AskQuestionPage implements OnInit {
  user: User | null = null;
  private authSub?: Subscription;

  post: Post = {
    type: 'whichTissue',
    content: '',
    images: [],
    subjects: [],
    tags: [],
    stainingMethods: [],
    addedBy: '',
    addedDate: new Date().toISOString(),
  };

  // Preset subjects
  presetSubjects = ['Anatomy', 'Physiology', 'Biochemistry'];

  // Signal holding subjects typed in input as a raw string
  customSubjects = signal('');

  // Signal toggling input visibility
  showMore = signal(false);

  // Signal holding all selected subjects as a Set (to avoid duplicates)
  selectedSubjectsSet = signal(new Set<string>());

  // Combine preset selected + custom input subjects as a computed array
  allSelectedSubjects = computed(() => {
    const set = new Set(this.selectedSubjectsSet());
    
    // Process custom subjects and add them to the set
    this.processCustomSubjects().forEach(s => set.add(s));
    
    return Array.from(set);
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.post.addedBy = user.uid;
      }
    });
  }

  // Process custom subjects string into an array of trimmed, non-empty strings
  private processCustomSubjects(): string[] {
    return this.customSubjects()
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  // Handle input event for custom subjects
  onInput(event: any) {
    const value = event.detail?.value || event.target?.value;
    this.customSubjects.set(value);
  }

  // Add custom subjects when the input loses focus or on enter key
  addCustomSubjects() {
    const subjectsToAdd = this.processCustomSubjects();
    
    if (subjectsToAdd.length > 0) {
      const currentSet = new Set(this.selectedSubjectsSet());
      subjectsToAdd.forEach(subject => currentSet.add(subject));
      this.selectedSubjectsSet.set(currentSet);
      this.customSubjects.set(''); // Clear input after adding
    }
  }

  // Remove subject from either preset or custom
  removeSubject(subject: string) {
    const currentSet = new Set(this.selectedSubjectsSet());
    currentSet.delete(subject);
    this.selectedSubjectsSet.set(currentSet);
  }

  // Toggle preset subject selection
  togglePresetSubject(subject: string) {
    const currentSet = new Set(this.selectedSubjectsSet());
    if (currentSet.has(subject)) {
      currentSet.delete(subject);
    } else {
      currentSet.add(subject);
    }
    this.selectedSubjectsSet.set(currentSet);
  }

  onSubmit() {
    // Update post subjects before submission
    this.post.subjects = this.allSelectedSubjects();
    console.log('Submitted Post:', this.post);
    // TODO: send to Firestore or backend
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}