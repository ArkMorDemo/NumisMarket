import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { addIcons } from 'ionicons';
import { closeOutline, timeOutline, funnelOutline, logoUsd, swapHorizontalOutline, cartOutline } from 'ionicons/icons';
import { IonIcon, IonContent, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'app-historico-modal',
  templateUrl: './historico-modal.component.html',
  styleUrls: ['./historico-modal.component.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle],
})
export class HistoricoModalComponent implements OnInit {

  @Output() fechar = new EventEmitter<void>();

  constructor() {
    addIcons({
      'close-outline': closeOutline,
      'time-outline': timeOutline,
      'funnel-outline': funnelOutline,
      'logo-usd': logoUsd,
      'swap-horizontal-outline': swapHorizontalOutline,
      'cart-outline': cartOutline
    });
  }

  closeModal() {
    this.fechar.emit();
  }

  ngOnInit() {}
}