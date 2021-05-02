import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ReviewService } from '../services/review.service';
import { User } from '../modal/User';
import { Review } from '../modal/Review';
import {Dorm} from '../modal/Dorm';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  private user : User;
  private favorites: Dorm[] = this.rs.getFavorites();

  constructor(private rs: ReviewService,
    public afAuth: AngularFireAuth,
    public fs: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigate(["/dorms"]);
  }

}
