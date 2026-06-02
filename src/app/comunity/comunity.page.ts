import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonSearchbar, IonButton, IonButtons, IonIcon, IonList, IonItem, IonAvatar, IonLabel, IonBadge} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { notificationsOutline, personCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { searchOutline, addOutline } from 'ionicons/icons';

@Component({
  selector: 'app-comunity',
  templateUrl: './comunity.page.html',
  styleUrls: ['./comunity.page.scss'],
  standalone: true,
  imports: [
    
    CommonModule,
    IonContent,
    IonToolbar,
    IonSearchbar,
    IonButton,
    IonButtons,
    IonIcon,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    HeaderComponent,
    IonHeader
]
})
export class ComunityPage implements OnInit {

  conversations = Array(7).fill({
    name: 'Name',
    message: 'Supporting line text lorem...',
    time: '10 min'
  });

  constructor() { 
   addIcons({ searchOutline, addOutline }); 
  }
  ngOnInit() {
  }

}
