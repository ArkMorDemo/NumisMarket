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
import { Router, RouterLink } from '@angular/router';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { CardComponent } from '../components/card/card.component';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
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
export class CatalogPage implements OnInit {

  moedas: Moeda[] = [];
  moedasFiltradas: Moeda[] = [];
  isLoading = false;
  errorMsg: string | null = null;

  selectedCountry = '';
  selectedType = '';
  selectedEra = '';
  searchName = '';

  readonly countries = [
  { id: 'Portugal',        name: 'Portugal' },
  { id: 'Brasil',          name: 'Brasil' },
  { id: 'Espanha',         name: 'Espanha' },
  { id: 'França',          name: 'França' },
  { id: 'Alemanha',        name: 'Alemanha' },
  { id: 'Reino Unido',     name: 'Reino Unido' },
  { id: 'Estados Unidos',  name: 'Estados Unidos' },
  { id: 'Itália',          name: 'Itália' },
  { id: 'África do Sul',   name: 'África do Sul' },
];

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit(): void {
    this.loadMoedas();
  }

  loadMoedas(): void {
    this.isLoading = true;
    this.http.get<Moeda[]>('assets/data/coin.json').subscribe({
      next: (data) => {
        this.moedas = data;
        this.moedasFiltradas = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = 'Erro ao carregar moedas.';
        this.isLoading = false;
        console.error('Erro ao carregar o ficheiro de moedas:', err);
      }
    });
  }

  aplicarFiltros(): void {
    const pais   = this.selectedCountry.toLowerCase();
    const tipo   = this.selectedType.toLowerCase();
    const epoca  = this.selectedEra.toLowerCase();
    const search = this.searchName.toLowerCase();

    this.moedasFiltradas = this.moedas.filter(m => {
      const matchPais   = !pais   || m.pais.toLowerCase().includes(pais);
      const matchTipo   = !tipo   || m.material.toLowerCase() === tipo;
      const matchEpoca  = !epoca  || this.getEpoca(m.ano) === epoca;
      const matchSearch = !search || m.nome.toLowerCase().includes(search)
                                  || String(m.ano).includes(search);
      return matchPais && matchTipo && matchEpoca && matchSearch;
    });
  }

  getEpoca(ano: number): string {
    if (ano >= 1900) return 'contemporanea';
    if (ano >= 1500) return 'moderna';
    return 'antiga';
  }

  onCountryChange(event: any): void {
    this.selectedCountry = event.detail.value;
    this.aplicarFiltros();
  }

  onTypeChange(event: any): void {
    this.selectedType = event.detail.value;
    this.aplicarFiltros();
  }

  onEraChange(event: any): void {
    this.selectedEra = event.detail.value;
    this.aplicarFiltros();
  }

  onSearchName(event: any): void {
    this.searchName = event.detail?.value ?? '';
    this.aplicarFiltros();
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