import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userLoggedIn : boolean = false;
  
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.userLoggedIn = true;
      }
    });
  }

  signout() {
    this.afAuth.signOut();
  }

  signin() {
    this.router.navigate(["/sign-in"])
  }

}
