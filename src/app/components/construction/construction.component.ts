import { Component } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { constructOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, RouterLink]
})
export class ConstructionComponent {
  constructor() {
    addIcons({ constructOutline, homeOutline });
  }
}