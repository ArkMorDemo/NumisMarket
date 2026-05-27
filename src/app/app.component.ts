import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.setupSlideRightTransition();
  }

  setupSlideRightTransition() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Add a small delay to ensure the page is rendered
        setTimeout(() => {
          const pages = document.querySelectorAll('ion-page');
          pages.forEach((page) => {
            page.classList.add('slide-right-transition');
          });
        }, 0);
      });
  }
}