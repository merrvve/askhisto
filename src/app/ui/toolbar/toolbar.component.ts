import { Component, Input, OnInit } from '@angular/core';
import { IonToolbar, IonButtons, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [IonToolbar, IonButtons, IonTitle]
})
export class ToolbarComponent  implements OnInit {
  @Input() title: string = "Ask Histo"
  constructor() { }

  ngOnInit() {}

}
