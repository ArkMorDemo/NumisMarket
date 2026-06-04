import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent, FooterComponent, IonButton, CardComponent, CommonModule, RouterLink,],
  standalone: true,
})
export class HomePage implements OnInit, OnDestroy {

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

  activeCard = 0;
  private sliderInterval: any;
  private dragStartX = 0;
  private readonly SWIPE_THRESHOLD = 50;

  ngOnInit() {
    this.startSlider();
  }

  ngOnDestroy() {
    this.stopSlider();
  }

  startSlider() {
    this.sliderInterval = setInterval(() => {
      this.activeCard = (this.activeCard + 1) % this.cards.length;
    }, 15000);
  }

  stopSlider() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  goToCard(index: number) {
    this.activeCard = index;
    // Reset the timer when user manually clicks a dot
    this.stopSlider();
    this.startSlider();
  }

  onCardButtonClick(cardName: string) {
    console.log(`Button clicked for: ${cardName}`);
  }

  onTouchStart(event: TouchEvent) {
    this.dragStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    const deltaX = event.changedTouches[0].clientX - this.dragStartX;
    this.handleSwipe(deltaX);
  }

  onMouseDown(event: MouseEvent) {
    this.dragStartX = event.clientX;
  }

  onMouseUp(event: MouseEvent) {
    const deltaX = event.clientX - this.dragStartX;
    this.handleSwipe(deltaX);
  }

  private handleSwipe(deltaX: number) {
    if (Math.abs(deltaX) < this.SWIPE_THRESHOLD) return;
    if (deltaX < 0) {
      // Swiped left → next card
      this.goToCard((this.activeCard + 1) % this.cards.length);
    } else {
      // Swiped right → previous card
      this.goToCard((this.activeCard - 1 + this.cards.length) % this.cards.length);
    }
  }

  constructor() {}
}
