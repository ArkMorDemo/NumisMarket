import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Moeda {
  id: number;
  nome: string;
  preco_euros: number;
  estado: string;
  material: string;
  ano: number;
  pais: string;
  imagem_url: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent, FooterComponent, IonButton, CardComponent, CommonModule, RouterLink,],
  standalone: true,
})
export class HomePage implements OnInit, OnDestroy {

  moedas: Moeda[] = [];

  

  activeCard = 0;
  private sliderInterval: any;
  private dragStartX = 0;
  private readonly SWIPE_THRESHOLD = 50;

  ngOnInit() {
     this.loadMoedas();
  }

  loadMoedas() {
      this.http.get<Moeda[]>('assets/data/coin.json').subscribe({
        next: (data) => {
          this.moedas = data.slice(9, 12);
          this.startSlider();
        },
        error: (err) => {
          console.error('Erro ao carregar o ficheiro de moedas:', err);
        }
      });
    }

  ngOnDestroy() {
    this.stopSlider();
  }

  startSlider() {
    this.sliderInterval = setInterval(() => {
      this.activeCard = (this.activeCard + 1) % this.moedas.length;
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
      this.goToCard((this.activeCard + 1) % this.moedas.length);
    } else {
      // Swiped right → previous card
      this.goToCard((this.activeCard - 1 + this.moedas.length) % this.moedas.length);
    }
  }

  constructor(private http: HttpClient) {}

  
}
