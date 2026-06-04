import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ConstructionComponent } from '../components/construction/construction.component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent, ConstructionComponent,]
})
export class SellPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
