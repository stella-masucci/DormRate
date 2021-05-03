import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Review } from '../modal/Review';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { ReviewService} from '../services/review.service';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Dorm} from '../modal/Dorm';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {

review: Review = {
  stars: 0,
  text: '',
  dormID: '',
  dormName: '',
  uid: ''
};

  starform = null;
  user : any;
  dorm = null;
  params = {};

  compareWith: (o1: any, o2: any) => boolean;

  private dorms: Observable<Dorm[]> = this.rs.getDorms();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private ar:ActivatedRoute,
    private rs:ReviewService,
    private formBuilder: FormBuilder
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(["/sign-in"]);
      }
    });

    this.starform = new FormGroup({
       stars: new FormControl()
    });

    this.compareWith = this.compareWithFn;
  }

  ngOnInit() {
    this.ar.params.subscribe(
      param => {
        this.dorm = param;
        console.log(this.dorm);
      });
  }

  submitItem() {
    this.user = firebase.auth().currentUser;
    this.review.uid = this.user.uid;
    this.review.dormID = this.dorm.id;
    this.review.dormName = this.dorm.name;
    console.log(this.review);
    this.rs.addReview(this.review).then((doc) => {
      console.log(doc);
      this.router.navigate(["/view-dorm-detail", this.dorm]);
    }, err => {
      console.log(err);
    });
  }

  back() {
    if (this.dorm && this.dorm.id) {
      this.router.navigate(["/view-dorm-detail", this.dorm]);
    } else {
      this.router.navigate(["/tabs/dorms"]);
    }
  }

  compareWithFn = (o1, o2) => {
    return o1.id === o2.id;
  };

  logRatingChange(rating){
        console.log("changed rating: ", rating);
        this.review.stars = rating;
        console.log(this.review.stars);
    }
}
