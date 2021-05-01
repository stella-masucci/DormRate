import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(["/sign-in"]);
      }
    });
  }

  ngOnInit() {
  }

}
