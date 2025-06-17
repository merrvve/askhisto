import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IonContent, IonHeader,IonSelectOption, IonSelect, IonItem, IonLabel, IonChip, IonIcon, IonButton, IonToolbar, IonTitle, IonInput, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonToast } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.page.html',
  styleUrls: ['./ask-question.page.scss'],
  standalone: true,
  imports: [IonToast, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonInput, IonButton, IonIcon, IonChip, IonLabel, IonItem, IonIcon, IonChip,  IonButton, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar,  FormsModule,
    //IonSelectOption, 
    IonInput, 
    //IonSelect
  ]
})
export class AskQuestionPage implements OnInit {
  user: User | null = null;
  private authSub?: Subscription;

  post : Post = {
    type: 'whichTissue',
    content: '',
    images: [] as string[],
    subjects: [] as string[],
    tags: [] as string[],
    stainingMethods: [] as string[],
    addedBy: '',
    addedDate: new Date().toDateString()
  };

  // UI state
  showAdditionalFields = false;
  toastMessage = "Loading..."
  // Preset options
  presetTags = ['Histology', 'Pathology', 'Embryology'];
  presetStainingMethods = ['H&E', 'IHC', 'Masson Trichrome'];

  // Temporary input values
  newSubjectsInput = '';
  newTagsInput = '';
  newStainingMethodsInput = '';
  // Subjects configuration
  presetSubjects = ['Respiratory', 'Cardiovascular', 'Digestive'];
  selectedSubjects: string[] = [];
  customSubjectInput = '';
  showMoreOptions = false;

  
  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.authSub = this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) this.post.addedBy = user.uid;
      else {
         this.router.navigate(['/login'])
      }
    });
  }

  // Toggle preset subject selection
  togglePresetSubject(subject: string) {
    const index = this.selectedSubjects.indexOf(subject);
    if (index > -1) {
      this.selectedSubjects.splice(index, 1);
    } else {
      this.selectedSubjects.push(subject);
    }
  }

  toggleAdditionalFields() {
    this.showAdditionalFields = !this.showAdditionalFields;
  }
  // Add custom subjects from input
  addSubjects() {
    const subjectsToAdd = this.newSubjectsInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.post.subjects = [...new Set([...this.post.subjects || [], ...subjectsToAdd])];
    this.newSubjectsInput = '';
  }

  // Remove a subject
  removeSubject(subject: string) {
    this.selectedSubjects = this.selectedSubjects.filter(s => s !== subject);
  }

  onSubmit() {
    // Update post with selected subjects
    this.post.subjects = [...this.selectedSubjects]; 
    console.log('Submitting post:', this.post);
    this.toastMessage = "Your post is submitted! "
    this.router.navigate(['forum'])
    // TODO: Implement actual submission
  }
  addTags() {
    const tagsToAdd = this.newTagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    this.post.tags = [...new Set([...this.post.tags || [], ...tagsToAdd])];
    this.newTagsInput = '';
  }

  addStainingMethods() {
    const methodsToAdd = this.newStainingMethodsInput
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    this.post.stainingMethods = [...new Set([...this.post.stainingMethods || [], ...methodsToAdd])];
    this.newStainingMethodsInput = '';
  }

  removeItem(array: string[], item: string) {
    return array.filter(i => i !== item);
  }

  uploadedImages: {
    file: File;
    preview: SafeUrl;
  }[] = [];

  
  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Clear existing if you want to replace instead of add
      // this.uploadedImages = []; 
      
      Array.from(input.files).forEach(file => {
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.uploadedImages.push({
              file,
              preview: this.sanitizer.bypassSecurityTrustUrl(e.target.result)
            });
          };
          reader.readAsDataURL(file);
        }
      });
      
      // Reset the input to allow selecting same files again
      input.value = '';
    }
  }

  removeImage(index: number) {
    this.uploadedImages.splice(index, 1);
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}