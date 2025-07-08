import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard } from '@ionic/angular/standalone';
import { Question } from 'src/app/models/Question';
import { Swiper } from 'swiper/types';
import { register } from 'swiper/element';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QuestionService } from 'src/app/services/quiz/questions.service';
import { Observable, Subscription, tap } from 'rxjs';
register();
export interface SwiperSlideChangeEvent {
  swiper: Swiper;
  activeIndex: number;
  realIndex: number;
}

interface ImageData {
  url: string;
  error: boolean;
  loading: boolean;
}
@Component({
  selector: 'app-qod',
  templateUrl: './qod.page.html',
  styleUrls: ['./qod.page.scss'],
  standalone: true,
  imports: [IonCard, IonContent,  CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QodPage implements OnInit {

  question?: Question;
displayedImages: ImageData[] = [];
  
  selectedChoice?:  number | null;
  questionSubscription?: Subscription;

  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.selectedChoice =null;
     this.questionSubscription = this.questionService.getLatestQuestion().subscribe( {
        next: (question)=> {
          console.log(question)
          if(question) this.question = question;
        },

     }
      
     )
  }
 selectAnswer(choice: number) {
    this.selectedChoice = choice;
  }

  Reload() {
    this.selectedChoice = null;
    this.initializeImages();
  }

  getChoiceColor(index: number): string {
    const isSelected = this.selectedChoice === index;
    const isCorrect = index === this.question?.rightChoice;

    if (isSelected && isCorrect) return 'success';
    if (isSelected && !isCorrect) return 'danger';
    if (!isSelected && isCorrect && this.selectedChoice !== null) return 'success';
    return 'medium';
  }

  handleImageLoad(index: number) {
    this.displayedImages[index].loading = false;
    this.displayedImages[index].error = false;
  }

  handleImageError(index: number) {
    console.error('Image load failed:', {
    url: this.displayedImages[index].url,
    status: 'Failed to load'
  });
    this.displayedImages[index].loading = false;
    this.displayedImages[index].error = true;
  }

  reloadImage(index: number) {
    // Reset the image state
    this.displayedImages[index].loading = true;
    this.displayedImages[index].error = false;
    
    // Create a new image object to trigger change detection
    const newImage = {
      ...this.displayedImages[index],
      url: this.addCacheBuster(this.displayedImages[index].url)
    };
    
    this.displayedImages[index] = newImage;
  }
initializeImages() {
  if(this.question) {
this.displayedImages = this.question.images.map(url => ({
        url: url,
        error: false,
        loading: true
      })); 
  }
    
  }
  addCacheBuster(url: string): string {
    if (url.includes('?')) {
      return url.split('?')[0] + '?t=' + Date.now();
    }
    return url + '?t=' + Date.now();
  }

  ngOnDestroy() {
    this.questionSubscription?.unsubscribe();
  }
}
