import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Review } from '../modal/Review';
import { FormGroup, FormControl } from '@angular/forms';
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

  starform=null;

  user:any;

  private dorms: Observable<Dorm[]> = this.rs.getDorms();

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private rs:ReviewService
  ) {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        this.router.navigate(["/sign-in"]);
      }
    });

    this.starform = new FormGroup({
       stars: new FormControl()
    });
  }

  ngOnInit() {
  }

  submitItem() {
    this.user = firebase.auth().currentUser;
    this.review.uid = this.user.uid;
    this.rs.addReview(this.review).then((doc) => {
      console.log(doc);
      this.router.navigateByUrl('/tabs/profile');
    }, err => {});
  }



}
