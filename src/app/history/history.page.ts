import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonSearchbar, IonButtons, IonAvatar, IonModal } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { timeOutline, notificationsOutline, homeOutline, walletOutline, cartOutline, logoUsd, chatbubbleOutline, starOutline, searchOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({ timeOutline, notificationsOutline, homeOutline, walletOutline, cartOutline, logoUsd, chatbubbleOutline, starOutline });
import { ModalController } from '@ionic/angular';
import { HistoricoModalComponent } from './historico-modal/historico-modal.component';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent, IonButton, IonIcon, IonSearchbar, IonButtons, IonAvatar, IonModal, HistoricoModalComponent]
})
export class HistoryPage implements OnInit {

  constructor() {
     addIcons({ searchOutline});
   }

  ngOnInit() {
  }

}
