import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router,ActivatedRoute } from '@angular/router';
import { Review } from '../modal/Review';
import { FormGroup, FormControl } from '@angular/forms';
import { ReviewService} from '../services/review.service';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Dorm} from '../modal/Dorm';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.page.html',
  styleUrls: ['./edit-review.page.scss'],
})
export class EditReviewPage implements OnInit {

  review: Review = {
    stars: 0,
    text: '',
    dormID: '',
    dormName: '',
    uid: ''
  };
  params = {};

    starform=null;

    user:any;

  constructor(public afAuth: AngularFireAuth,
  private router: Router, private ar: ActivatedRoute,
  private rs:ReviewService) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(["/sign-in"]);
      }
    });

    this.starform = new FormGroup({
       stars: new FormControl()
    });}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  const id = this.ar.snapshot.paramMap.get('review');
  if(id) {
    this.rs.getReview(id).subscribe(reviewData => {
      this.review = reviewData;
      console.log(this.review);
    })
  }
}

  updateItem() {
    this.user = firebase.auth().currentUser;
    //double check
    if(this.review.uid==this.user.uid) {
      this.rs.editReview(this.review).then((doc) => {
      this.router.navigate(['/tabs/profile']);
    }, err => {});
    }
  }

  back() {
    this.router.navigate(["/tabs/profile"]);
  }

  logRatingChange(rating){
        console.log("changed rating: ",rating);
        this.review.stars = rating;
        console.log(this.review.stars);
    }

}
