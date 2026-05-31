import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    HeaderComponent, 
     FooterComponent // ⬅️ essencial!
  ],
})
export class AccountPage {
  email: string = '';
  senha: string = '';

  constructor(private router: Router) {}

  entrar() {
    console.log('Login:', this.email, this.senha);
    // this.router.navigate(['/home']);
  }

  irParaRegisto() {
    this.router.navigate(['/registo']);
  }
}