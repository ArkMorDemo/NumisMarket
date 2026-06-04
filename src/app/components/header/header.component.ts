import { Component } from '@angular/core';
import {
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, book, cart, cash, chatbox, star } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonFooter, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {
    addIcons({ home, book, cart, cash, chatbox, star });
  }
}
