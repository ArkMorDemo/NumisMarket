import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonButton, IonLabel,
  IonSelectOption, IonItem, IonSelect,
  IonSpinner, IonText, IonInput
} from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardComponent } from '../components/card/card.component';
import { CoinService } from '../services/coin.service';
import { Coin } from '../models/coin.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonButton, IonLabel,
    IonSelectOption, IonItem, IonSelect,
    IonSpinner, IonText, IonInput,
    HeaderComponent, FooterComponent, CardComponent
  ]
})
export class CatalogPage implements OnInit, OnDestroy {

  coins: Coin[] = [];
  isLoading = false;
  errorMsg: string | null = null;

  selectedCountry = '';
  selectedType    = '';
  selectedEra     = '';
  searchName      = '';

  readonly countries = [
    { id: 'pt', name: 'Portugal' },
    { id: 'br', name: 'Brasil' },
    { id: 'es', name: 'Espanha' },
    { id: 'fr', name: 'França' },
    { id: 'de', name: 'Alemanha' },
    { id: 'uk', name: 'Reino Unido' },
  ];

  private subs = new Subscription();

  constructor(private coinService: CoinService, private router: Router) {}

  ngOnInit(): void {
    this.subs.add(
      this.coinService.getLoading().subscribe(v => this.isLoading = v)
    );
    this.subs.add(
      this.coinService.getError().subscribe(v => this.errorMsg = v)
    );
    this.subs.add(
      this.coinService.getFilteredCoins().subscribe(coins => this.coins = coins)
    );
    this.subs.add(
      this.coinService.loadCoins().subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onCountryChange(event: any): void {
    this.coinService.setFilters({ country: event.detail.value });
  }

  onTypeChange(event: any): void {
    this.coinService.setFilters({ type: event.detail.value });
  }

  onEraChange(event: any): void {
    this.coinService.setFilters({ era: event.detail.value });
  }

  onSearchName(event: any): void {
    this.searchName = event.detail.value ?? '';
    this.coinService.setFilters({ name: this.searchName });
  }

  onCardAction(coin: Coin): void {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/details', coin.id]);
  }
}
