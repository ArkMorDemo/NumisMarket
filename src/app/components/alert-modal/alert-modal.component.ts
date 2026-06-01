import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonRange,
  IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

import { AlertaService, AlertaMoeda } from '../../services/alerta';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonRange,
    IonIcon,
  ],
})
export class AlertModalComponent {
  alerta: AlertaMoeda = {
    nome: '',
    pais: '',
    tipoAnuncio: '',
    epoca: '',
    material: '',
    precoMin: 0,
    precoMax: 1000000,
    notificarEmail: false,
    notificarSite: false,
  };

  paises = ['Portugal', 'Espanha', 'França', 'Brasil', 'Alemanha', 'Itália'];
  tiposAnuncio = ['Qualquer', 'Venda', 'Leilão', 'Troca'];
  epocas = [
    'Antes de 1800',
    '1800 - 1880',
    '1880 - 1920',
    '1920 - 1980',
    'Após 1980',
  ];
  materiais = ['Qualquer', 'Ouro', 'Prata', 'Cobre', 'Bronze', 'Níquel'];

  constructor(
    private modalCtrl: ModalController,
    private alertaService: AlertaService,
  ) {
    addIcons({ close });
  }

  fechar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    const novo = this.alertaService.guardar(this.alerta);
    console.log('Alerta guardado:', novo);
    this.modalCtrl.dismiss(novo, 'confirm');
  }
  onPrecoChange(event: any) {
  const valor = event.detail.value;   // { lower: number, upper: number }
  this.alerta.precoMin = valor.lower;
  this.alerta.precoMax = valor.upper;
}
}