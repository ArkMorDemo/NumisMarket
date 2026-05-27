import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent, IonButton,]
})
export class CatalogPage {
  selectedPO: string = '';
  PO = [
    { id: 'btc', name: 'Bitcoin' },
    { id: 'eth', name: 'Ethereum' },
    { id: 'usd', name: 'US Dollar' },
    { id: 'eur', name: 'Euro' },
    { id: 'gbp', name: 'British Pound' }
  ];

  onPOChange(event: any) {
    console.log('Coin selected:', event.detail.value);
  }


  constructor() { }
}
