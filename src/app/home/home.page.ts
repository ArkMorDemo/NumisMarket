import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent, FooterComponent, IonButton, CardComponent, CommonModule,],
  standalone: true,
})
export class HomePage {
  cards = [
    {
      name: 'Product 1',
      image: '../../assets/img/Coin.png',
      qualities: ['High Quality', 'Durable', 'Eco-friendly'],
      buttonText: 'Comprar'
    },
    {
      name: 'Product 2',
      image: '../../assets/img/Coin.png',
      qualities: ['Fast Shipping', 'Warranty', 'Customer Support'],
      buttonText: 'Comprar'
    },
    {
      name: 'Product 3',
      image: '../../assets/img/Coin.png',
      qualities: ['Premium', 'Exclusive', 'Limited Edition'],
      buttonText: 'Comprar'
    }
  ];
  onCardButtonClick(cardName: string) {
    console.log(`Button clicked for: ${cardName}`);
  }
  constructor() {}
}
