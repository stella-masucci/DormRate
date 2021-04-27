import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, public firebase: AngularFirestore) {
    this.initializeApp();
  }

  initializeApp() {
    
  }
}
