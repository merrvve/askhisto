import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { Question } from 'src/app/models/Question';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/quiz/questions.service';
import { QuizSetting } from 'src/app/models/QuizSetting';
import { Swiper } from 'swiper/types';
import { register } from 'swiper/element';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { shuffleArray } from 'src/helpers/shuffle-array';
import { ToolbarComponent } from 'src/app/ui/toolbar/toolbar.component';

// Register Swiper custom elements
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
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonCard,
    IonButton,
    IonText,
    IonCardContent,
    IonRow,
    IonGrid,
    IonCol,
    ToolbarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuizPage implements OnInit {
  selectedChoice?: number | null = null;
  questions: Question[] = [];
  displayedImages: ImageData[][] = []; // New image data structure
  currentIndex: number = 0;
  isComplete: boolean = false;

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.isComplete = false;
    const settings: QuizSetting = {
      subjects: ['ALL'],
      stainingMethods: ['ALL'],
      tags: ['ALL'],
      questionType: 'whichTissue',
      numberOfQuestions: 10,
      randomize: true,
    };

    this.questionService.getQuestionsByQuizSetting(settings).subscribe((qs) => {
      this.questions = shuffleArray(qs);
      this.initializeImages();
      console.log(this.questions);
    });
  }

  initializeImages() {
    this.displayedImages = this.questions.map(question => {
      return question.images.map(url => ({
        url: url,
        error: false,
        loading: true
      }));
    });
  }

  nextQuestion() {
    this.currentIndex += 1;
    this.selectedChoice = null;
    if (this.currentIndex > this.questions.length - 1) {
      this.isComplete = true;
    }
  }

  selectAnswer(choice: number) {
    this.selectedChoice = choice;
  }

  Reload() {
    this.selectedChoice = null;
    this.currentIndex = 0;
    this.isComplete = false;
    this.initializeImages();
  }

  getChoiceColor(index: number): string {
    const isSelected = this.selectedChoice === index;
    const isCorrect = index === this.questions[this.currentIndex].rightChoice;

    if (isSelected && isCorrect) return 'success';
    if (isSelected && !isCorrect) return 'danger';
    if (!isSelected && isCorrect && this.selectedChoice !== null) return 'success';
    return 'medium';
  }

  handleImageLoad(index: number) {
    this.displayedImages[this.currentIndex][index].loading = false;
    this.displayedImages[this.currentIndex][index].error = false;
  }

  handleImageError(index: number) {
    console.error('Image load failed:', {
    url: this.displayedImages[this.currentIndex][index].url,
    status: 'Failed to load'
  });
    this.displayedImages[this.currentIndex][index].loading = false;
    this.displayedImages[this.currentIndex][index].error = true;
  }

  reloadImage(index: number) {
    // Reset the image state
    this.displayedImages[this.currentIndex][index].loading = true;
    this.displayedImages[this.currentIndex][index].error = false;
    
    // Create a new image object to trigger change detection
    const newImage = {
      ...this.displayedImages[this.currentIndex][index],
      url: this.addCacheBuster(this.displayedImages[this.currentIndex][index].url)
    };
    
    this.displayedImages[this.currentIndex][index] = newImage;
  }

  addCacheBuster(url: string): string {
    if (url.includes('?')) {
      return url.split('?')[0] + '?t=' + Date.now();
    }
    return url + '?t=' + Date.now();
  }

  Home() {
    this.router.navigate(['/']);
  }
}