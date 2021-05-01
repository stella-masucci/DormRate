import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userLoggedIn : boolean = false;
  
  constructor(
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userLoggedIn = true;
      }
    });
  }

  logout() {
    this.afAuth.signOut();
  }

}
