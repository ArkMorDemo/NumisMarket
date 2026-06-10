import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { chatbubbleOutline } from 'ionicons/icons';
import {
  IonContent, IonButton, IonSpinner, IonText, IonIcon
} from '@ionic/angular/standalone';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

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
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonSpinner, IonText, IonIcon,
            HeaderComponent,RouterLink,  FooterComponent]
})
export class DetailsPage implements OnInit {

  moeda: Moeda | null = null;
  isLoading = true;
  selectedImage = '';
  qualityRows: { label: string; value: string }[] = [];

  readonly seller = { initials: 'Ns', name: 'numismatica_sul', rating: 4.9, reviews: 2, sales: 14 };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private location: Location
  ) {
    addIcons({ chatbubbleOutline });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<Moeda[]>('assets/data/coin.json').subscribe({
      next: (moedas) => {
        this.moeda = moedas.find(m => m.id === id) ?? null;
        if (this.moeda) {
          this.selectedImage = this.moeda.imagem_url;
          this.qualityRows = [
            { label: 'Material', value: this.moeda.material },
            { label: 'Estado',   value: this.moeda.estado },
            { label: 'Ano',      value: String(this.moeda.ano) },
            { label: 'País',     value: this.moeda.pais },
            { label: 'Preço',    value: this.moeda.preco_euros + ' €' },
          ];
        }
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  get subtitle(): string {
    if (!this.moeda) return '';
    return `${this.moeda.pais} · ${this.moeda.ano} · ${this.moeda.estado}`;
  }

  goBack(): void {
    this.location.back();
  }

  selectImage(img: string): void {
    this.selectedImage = img;
  }
}