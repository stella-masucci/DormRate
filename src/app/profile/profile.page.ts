import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public afauth: AngularFireAuth,
  public fs: AngularFirestore,
  private router: Router,
  private ar: ActivatedRoute) { }

  ngOnInit() {
    var user = firebase.auth().currentUser;
    console.log(user.uid);
    // this.afauth.onAuthStateChanged(user => {
    //   if(user) {
    //     console.log(user);
    //     //this.user = user;
    //   }
    //   else {
    //     console.log("not logged in");
    //   }
    // })
  }

}
