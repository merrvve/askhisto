import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
  IonButton,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonToast,
  IonCardHeader,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/forum/post.service';
import { ToolbarComponent } from '../../ui/toolbar/toolbar.component';
import * as UC from '@uploadcare/file-uploader';
import '@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.page.html',
  styleUrls: ['./ask-question.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonInput,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
    IonItem,
    IonIcon,
    IonChip,
    IonButton,
    IonLabel,
    IonItem,
    IonContent,
    FormsModule,
    //IonSelectOption,
    IonInput,
    ToolbarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AskQuestionPage implements OnInit {
  user: User | null = null;
  private authSub?: Subscription;

  post: Post = {
    type: 'whichTissue',
    content: '',
    images: [] as string[],
    subjects: [] as string[],
    tags: [] as string[],
    stainingMethods: [] as string[],
    addedBy: '',
    addedDate: new Date(),
  };

  // UI state
  showAdditionalFields = false;
  toastMessage = 'Loading...';
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
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private postService: PostService
  ) {
    UC.defineComponents(UC);
  }
  @ViewChild('uploader') uploader!: ElementRef;

  // Configuration properties
  multipleMin = 1; // Minimum number of required files
  multipleMax = 5; // Maximum number of allowed files

  formOutput = '';

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const entries: [string, FormDataEntryValue][] = [];

    formData.forEach((value, key) => {
      entries.push([key, value]);
    });

    // Optional: convert to readable string for output
    this.formOutput = JSON.stringify(entries, null, 2);

    // ✅ Access uploaded file URLs like this
    const uploadedFileUrls = entries
      .filter(([key]) => key === 'my-uploader' || key === 'my-uploader[]')
      .map(([_, value]) => value);

    console.log('Uploaded File URLs:', uploadedFileUrls);
    console.log(this.formOutput);
  }
  ngOnInit() {
    this.authSub = this.authService.user$.subscribe((user) => {
      this.user = user;
      if (user) this.post.addedBy = user.uid;
      else {
        //  this.router.navigate(['/login'])
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
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    this.post.subjects = [
      ...new Set([...(this.post.subjects || []), ...subjectsToAdd]),
    ];
    this.newSubjectsInput = '';
  }

  // Remove a subject
  removeSubject(subject: string) {
    this.selectedSubjects = this.selectedSubjects.filter((s) => s !== subject);
  }

  // onSubmit() {
  //   // Update post with selected subjects
  //   this.post.subjects = [...this.selectedSubjects];
  //   console.log('Submitting post:', this.post);
  //   this.postService.addPost(this.post);
  //   this.toastMessage = "Your post is submitted! "
  //   this.router.navigate(['forum'])
  //   // TODO: Implement actual submission
  // }

  // async onSubmit() {
  //   if (this.isSubmitting) return;
  //   this.post.subjects = [...this.selectedSubjects];
  //   console.log('Submitting post:', this.post);
  //   this.isSubmitting = true;

  //   try {
  //     await this.postService.addPost(this.post);
  //     console.log('Post submitted successfully!');
  //     this.toastMessage = "Your post is submitted! "

  //     this.resetForm();

  //     // Optional: Navigate away
  //     await this.router.navigate(['/forum']);
  //   } catch (error) {
  //     this.toastMessage = 'Error submitting post' + error;
  //     // Optional: Show error toast
  //     // this.showErrorToast();
  //   } finally {
  //     this.isSubmitting = false;
  //   }
  // }

  private resetForm() {
    this.post = {
      type: 'whichTissue',
      content: '',
      images: [],
      subjects: [],
      tags: [],
      stainingMethods: [],
      addedBy: this.user?.displayName || '',
      addedDate: new Date(),
    };
  }

  addTags() {
    const tagsToAdd = this.newTagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    this.post.tags = [...new Set([...(this.post.tags || []), ...tagsToAdd])];
    this.newTagsInput = '';
  }

  addStainingMethods() {
    const methodsToAdd = this.newStainingMethodsInput
      .split(',')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);

    this.post.stainingMethods = [
      ...new Set([...(this.post.stainingMethods || []), ...methodsToAdd]),
    ];
    this.newStainingMethodsInput = '';
  }

  removeItem(array: string[], item: string) {
    return array.filter((i) => i !== item);
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

      Array.from(input.files).forEach((file) => {
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.uploadedImages.push({
              file,
              preview: this.sanitizer.bypassSecurityTrustUrl(e.target.result),
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
