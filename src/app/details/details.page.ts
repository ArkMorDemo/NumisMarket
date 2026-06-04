import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { chatbubbleOutline } from 'ionicons/icons';
import {
  IonContent, IonButton, IonSpinner, IonText, IonIcon
} from '@ionic/angular/standalone';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { Coin } from '../models/coin.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonSpinner, IonText, IonIcon,
            HeaderComponent, FooterComponent]
})
export class DetailsPage implements OnInit {

  coin: Coin | null = null;
  isLoading = true;
  selectedImage = '';
  qualityRows: { label: string; value: string }[] = [];

  readonly price = '80,00 €';
  readonly seller = { initials: 'Ns', name: 'numismatica_sul', rating: 4.9, reviews: 2, sales: 14 };

  private readonly typeMap: Record<string, string> = {
    comum:        'BC (bem conservada)',
    comemorativa: 'MBC (muito bem conservada)',
    prova:        'Proof'
  };

  private readonly eraMap: Record<string, string> = {
    contemporanea: 'Contemporânea',
    moderna:       'Moderna',
    antiga:        'Antiga'
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {
    addIcons({ chatbubbleOutline });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get<Coin[]>('assets/data/coins.json').subscribe({
      next: (coins) => {
        this.coin = coins.find(c => c.id === id) ?? null;
        if (this.coin) {
          this.selectedImage = this.coin.image;
          this.qualityRows = this.coin.qualities.map(q => {
            const idx = q.indexOf(': ');
            return { label: q.slice(0, idx), value: q.slice(idx + 2) };
          });
          this.qualityRows.push(
            { label: 'Estado',     value: this.typeMap[this.coin.type] ?? this.coin.type },
            { label: 'Época',      value: this.eraMap[this.coin.era]   ?? this.coin.era  },
            { label: 'Referência', value: this.coin.id.toUpperCase() }
          );
        }
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  get subtitle(): string {
    if (!this.coin) return '';
    const countryMap: Record<string, string> = {
      pt: 'Portugal', br: 'Brasil', es: 'Espanha',
      fr: 'França',   de: 'Alemanha', uk: 'Reino Unido'
    };
    return `${countryMap[this.coin.country] ?? this.coin.country} · ${this.eraMap[this.coin.era]} · ${this.coin.type.charAt(0).toUpperCase() + this.coin.type.slice(1)}`;
  }

  goBack(): void {
    this.location.back();
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
}
