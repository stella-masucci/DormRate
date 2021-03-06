import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

    user =
    {
      email:"",
      password:"",
      name:"",
      numberofreviews:0
    }

  constructor(

    public afauth: AngularFireAuth,
    public firebase: AngularFirestore,
    private router: Router,
    private tc: ToastController,
    private ar: ActivatedRoute,
    private rs: ReviewService

  ) { }

  ngOnInit() {
    console.log("initializing sign in page");
  }

  signInWithEmail(email: string, password: string) {
  	// Promise<firebase.auth.UserCredential>
    console.log("Signing in");
    this.afauth.signInWithEmailAndPassword(email, password).then(user => {
  		// navigate to user profile
  		var user1 = firebase.auth().currentUser;
      //this.itemservice.setUID(user.user.uid);
      this.toastMessage();
      var db = firebase.firestore();
      var self = this;
      db.collection("users").where("uid",'==', user1.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, "=>", doc.data());
            self.router.navigate(["/tabs/dorms"]);
            //self.rs.load();
          });
        })
        .catch(function(error) {
          console.log("Error getting documents:",error);
        });
        self.router.navigate(["/tabs/dorms"]);
  	})
  	.catch(error => {
      console.log(error);
      this.router.navigate(["/sign-in"]);
      const t = document.createElement('ion-toast');
      t.message = "Incorrect email/password combo, or user does not exist.";
      t.color = "danger";
      t.duration = 2000;
      document.body.appendChild(t);
      return t.present();
  	});
  }

  signup() {
    this.router.navigate(["/create-account"])
  }

  back() {
    this.router.navigate(["/home"]);
  }

  loginGoogle() {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider();
    var self = this;
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token.
      var cred = result.credential as firebase.auth.OAuthCredential;
      var token = cred.accessToken;
      // The signed-in user info.
      var user = result.user;

      self.toastMessage();
      self.router.navigate(["/tabs/dorms"]);
    });
  }

  toastMessage() {
    const toast = document.createElement('ion-toast');
    toast.message = 'Succesfully logged in.';
    toast.color = "success";
    toast.duration = 2000;
    document.body.appendChild(toast);
    toast.present();
  }

}
