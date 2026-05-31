import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  arrowBackOutline, 
  timeOutline, 
  funnelOutline, 
  logoUsd, 
  swapHorizontalOutline, 
  cartOutline 
} from 'ionicons/icons';
import { IonIcon, IonContent, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-historico-modal',
  templateUrl: './historico-modal.component.html',
  styleUrls: ['./historico-modal.component.scss'],
  imports: [IonIcon, IonContent, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, ],
})
export class HistoricoModalComponent implements OnInit {

  constructor() {
    addIcons({
      'arrow-back-outline': arrowBackOutline,
      'time-outline': timeOutline,
      'funnel-outline': funnelOutline,
      'logo-usd': logoUsd,
      'swap-horizontal-outline': swapHorizontalOutline,
      'cart-outline': cartOutline
    });
  }

  ngOnInit() {}
}