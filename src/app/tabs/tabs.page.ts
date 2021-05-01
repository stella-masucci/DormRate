import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  logout() {
    this.afAuth.signOut();
  }

}
