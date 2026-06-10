import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonToggle,
  ModalController,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { notifications, arrowUndo, notificationsOutline, closeOutline } from 'ionicons/icons';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AlertModalComponent } from '../components/alert-modal/alert-modal.component';
import { AlertaService, AlertaMoeda } from '../services/alerta';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    IonToggle,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
})
export class NotifyPage implements OnInit {
  abaAtiva: 'alertas' | 'notificacoes' = 'alertas';
  alertas: (AlertaMoeda & { ativo: boolean })[] = [];

  constructor(
    private alertaService: AlertaService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
  ) {
    addIcons({ notifications, arrowUndo, notificationsOutline, 'close-outline': closeOutline });
  }

  ngOnInit() { this.carregar(); }
  ionViewWillEnter() { this.carregar(); }

  carregar() {
    this.alertas = this.alertaService.listar().map((a) => ({
      ...a,
      ativo: (a as any).ativo !== false, // por defeito ativo
    }));
  }

  get ativos() {
    return this.alertas.filter((a) => a.ativo);
  }

  get pausados() {
    return this.alertas.filter((a) => !a.ativo);
  }

  toggleAtivo(alerta: any) {
    alerta.ativo = !alerta.ativo;
    // Atualiza no service
    this.alertaService.apagar(alerta.id);
    this.alertaService.guardar(alerta);
    this.carregar();
  }

  async criarAlerta() {
    const modal = await this.modalCtrl.create({
      component: AlertModalComponent,
      cssClass: 'alerta-modal',
    });
    await modal.present();
    const { role } = await modal.onWillDismiss();
    if (role === 'confirm') this.carregar();
  }

  async editar(alerta: AlertaMoeda) {
  const modal = await this.modalCtrl.create({
    component: AlertModalComponent,
    cssClass: 'alerta-modal',
    componentProps: {
      alertaEditar: alerta,
    },
  });
  await modal.present();
  const { role } = await modal.onWillDismiss();
  if (role === 'confirm') this.carregar();
}

  async remover(id: string) {
    const confirm = await this.alertCtrl.create({
      header: 'Remover alerta?',
      cssClass: 'alerta-remover',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Remover',
          role: 'destructive',
          handler: () => {
            this.alertaService.apagar(id);
            this.carregar();
          },
        },
      ],
    });
    await confirm.present();
  }

  voltar() {
    this.router.navigate(['/catalog']);
  }

  formatarData(iso?: string): string {
    if (!iso) return '';
    const d = new Date(iso);
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
  }
}