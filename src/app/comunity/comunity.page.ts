import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonToolbar, IonSearchbar, IonButton, IonButtons, IonIcon, IonList, IonItem, IonAvatar, IonLabel, IonBadge} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { addIcons } from 'ionicons';
import { searchOutline, addOutline, notificationsOutline, personCircleOutline } from 'ionicons/icons';

export interface Conversation {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unread: number;
}

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
    IonBadge,
    HeaderComponent,
    IonHeader
  ]
})
export class ComunityPage implements OnInit {

  conversations: Conversation[] = [];
chat: any;

  constructor(private http: HttpClient) { 
    addIcons({ searchOutline, addOutline, personCircleOutline, notificationsOutline }); 
  }

  ngOnInit() {
    this.loadConversations();
  }

  loadConversations() {
    this.http.get<Conversation[]>('assets/data/conversations.json').subscribe({
      next: (data) => {
        this.conversations = data;
      },
      error: (err) => {
        console.error('Erro ao carregar conversas:', err);
      }
    });
  }

}