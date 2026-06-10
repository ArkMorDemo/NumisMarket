import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonLabel,
  IonSelectOption,
  IonItem,
  IonSelect,
  IonSpinner,
  IonText,
  IonInput,
  ModalController,
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardComponent } from '../components/card/card.component';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { CoinService } from '../services/coin.service';
import { Coin } from '../models/coin.model';
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
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonContent,
    IonButton,
    IonLabel,
    IonSelectOption,
    IonItem,
    IonSelect,
    IonSpinner,
    IonText,
    IonInput,
    HeaderComponent,
    FooterComponent,
    CardComponent,
  ],
})
export class CatalogPage implements OnInit, OnDestroy {

  coins: Coin[] = [];
  moedas: Moeda[] = [];
  isLoading = false;
  errorMsg: string | null = null;

  selectedCountry = '';
  selectedType = '';
  selectedEra = '';
  searchName = '';

  readonly countries = [
    { id: 'pt', name: 'Portugal' },
    { id: 'br', name: 'Brasil' },
    { id: 'es', name: 'Espanha' },
    { id: 'fr', name: 'França' },
    { id: 'de', name: 'Alemanha' },
    { id: 'uk', name: 'Reino Unido' },
  ];

  private subs = new Subscription();

  constructor(
    private http: HttpClient,
    private coinService: CoinService,
    private router: Router,
    private modalCtrl: ModalController
   
  ) {}

  ngOnInit(): void {
    this.loadMoedas();
    this.subs.add(
      this.coinService.getLoading().subscribe(v => this.isLoading = v)
    );

    this.subs.add(
      this.coinService.getError().subscribe(v => this.errorMsg = v)
    );

    this.subs.add(
      this.coinService.getFilteredCoins().subscribe(
        coins => this.coins = coins
      )
    );

    this.subs.add(
      this.coinService.loadCoins().subscribe()
    );
  }

  loadMoedas() {
        this.http.get<Moeda[]>('assets/data/coin.json').subscribe({
          next: (data) => {
            this.moedas = data;
            
          },
          error: (err) => {
            console.error('Erro ao carregar o ficheiro de moedas:', err);
          }
        });
      }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onCountryChange(event: any): void {
    this.selectedCountry = event.detail.value;
    this.coinService.setFilters({
      country: this.selectedCountry
    });
  }

  onTypeChange(event: any): void {
    this.selectedType = event.detail.value;
    this.coinService.setFilters({
      type: this.selectedType
    });
  }

  onEraChange(event: any): void {
    this.selectedEra = event.detail.value;
    this.coinService.setFilters({
      era: this.selectedEra
    });
  }

  onSearchName(event: any): void {
    this.searchName = event.detail?.value ?? '';
    this.coinService.setFilters({
      name: this.searchName
    });
  }

  onCardAction(moeda: Moeda): void {
    this.router.navigate(['/details', moeda.id]);
  }

  async abrirAlerta(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AlertModalComponent,
      cssClass: 'alerta-modal',
    });

    await modal.present();
  }
}