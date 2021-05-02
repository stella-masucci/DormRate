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

  private user:User;

  private reviewCollection: AngularFirestoreCollection<Review>;
  private dorms: Observable<Dorm[]>;
  private dormCollection: AngularFirestoreCollection<Dorm>;
  private favoriteslist= [];
  private favorites= [];
  private userreviews: Observable<Review[]>;
  private userreviewsCollection: AngularFirestoreCollection<Review>;

  constructor(public af: AngularFirestore, public afAuth: AngularFireAuth) {
    console.log("initializing review service");
    this.load();
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

          //loads reviews for each dorm
          this.dorms.pipe(
          tap(dormsarray => {
             dormsarray.forEach(d => {
               console.log("cycling through ",d.name);
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

               let sum = 0;
               let count = 0;
               d.reviews.pipe(
                 tap(reviewarray => {
                   reviewarray.forEach(r => {
                     console.log(r.text,r.stars);
                     sum = sum + r.stars;
                     count++;
                   });
                 }),
                 take(1)
               ).subscribe();
               d.averagestars = sum/count;
               console.log("setting average stars to ",d.averagestars);

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
    var authUser = firebase.auth().currentUser;
    this.dorms.pipe(
    tap(dormsarray => {
       dormsarray.forEach(d => {
         if(d!= null && d.favoritedby.includes(authUser.uid) && !(this.favorites.includes(d))) {
           this.favorites.push(d);
         }
       });
    }),
    take(1)
    ).subscribe();
    console.log(this.favorites);
    return this.favorites;
  }

  getUserReviews(): Observable<Review[]> {
    // load reviews of authUser
    var authUser = firebase.auth().currentUser;
    this.userreviews = this.af.collection<Review>('reviews', ref => ref.where('uid', '==', authUser.uid))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
    return this.userreviews;
  }




 //***** other necessary methods *********

  //create a review
  //edit a review
  //add a favorite
  //remove a favorite
}
