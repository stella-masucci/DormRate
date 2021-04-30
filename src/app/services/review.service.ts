import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take,tap} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {User} from '../modal/User';
import {Review} from '../modal/Review';
import {Dorm} from '../modal/Dorm';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewCollection: AngularFirestoreCollection<Review>;
  private dorms: Observable<Dorm[]>;
  private dormCollection: AngularFirestoreCollection<Dorm>;
  private favoriteslist= [];
  private favorites= [];
  private userreviews: Observable<Review[]>;
  private userreviewsCollection: AngularFirestoreCollection<Review>;

  constructor(public af: AngularFirestore, public afauth: AngularFireAuth) {
    console.log("initializing review service");
    this.load();
    //get all reviews by user - check which uid == user.uid

  }

  load() {
        //loads dorms
        this.dormCollection = this.af.collection<Dorm>('dorms');
          this.dorms = this.dormCollection.snapshotChanges().pipe(
            map(actions => {
              return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );

          // var user = firebase.auth.currentUser;
          // var uid = user.uid;
          // console.log(user);
          //this.favoriteslist = user.favorites;

          //loads reviews for each dorm
          this.dorms.pipe(
          tap(dormsarray => {
             dormsarray.forEach(d => {

               this.reviewCollection = this.af.collection<Review>('reviews',ref =>
                 ref.where('dormid','==',d.id));
               d.reviews = this.reviewCollection.snapshotChanges().pipe(
                 map(actions => {
                   return actions.map(a => {
                     const data = a.payload.doc.data();
                     const id = a.payload.doc.id;
                     return { id, ...data};
                   });
                 })
               );
               //loads favorites
               // if(this.favoriteslist.includes(d.id)) {
               //   this.favorites.push(d);
               // }

             });
          }),
          take(1)
        ).subscribe();

  }

  getDorms(): Observable<Dorm[]> {
    console.log("getting dorms");
    return this.dorms;
  }

  getFavorites(): Dorm[] {
    return this.favorites;
  }

  getUserReviews(): Observable<Review[]> {
    return this.userreviews;
  }



 //***** other necessary methods *********

  //create a review
  //edit a review
  //add a favorite
  //remove a favorite
}
