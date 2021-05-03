import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReviewService } from '../services/review.service';
import { User } from '../modal/User';
import { Review } from '../modal/Review';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private user : User;
  private name='';
  private reviews: Observable<Review[]> = this.rs.getUserReviews();

  constructor(
    public afAuth: AngularFireAuth,
    public fs: AngularFirestore,
    private router: Router,
    private rs: ReviewService)
  {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(["/sign-in"]);
      }
    });
  }

  ngOnInit() {
    var authUser = firebase.auth().currentUser;
    console.log(authUser.uid);
    var self = this;
    firebase.firestore().collection("users").where("uid",'==', authUser.uid).limit(1)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, "=>", doc.data());
          self.user = new User(doc.data().uid, doc.data().name);
          console.log("got to line 43");
          console.log(doc.data().name);
      });
    })
    .catch(function(error) {
      console.log("Error getting documents:",error);
    });
    this.name = this.rs.getName();
  }

  goToFavorites() {
    console.log("go to favorites");
    this.router.navigate(["/favorites"]);
  }

  editReview(review) {
    this.router.navigate(["/edit-review",review]);
  }

}
