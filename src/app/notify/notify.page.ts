import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { ConstructionComponent } from '../components/construction/construction.component';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.page.html',
  styleUrls: ['./notify.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, FooterComponent, ConstructionComponent,]
})
export class NotifyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
