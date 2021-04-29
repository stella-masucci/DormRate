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

  user =
  {
    email:"",
    password:"",
    name:"",
    numberofreviews:0
  }

  constructor(public afauth: AngularFireAuth,
  public firebase: AngularFirestore,
  private router: Router,
  private ar: ActivatedRoute) { }

  ngOnInit() {
    this.afauth.onAuthStateChanged(user => {
      if(user) {
        console.log(user);
        //this.user = user;
      }
      else {
        console.log("not logged in");
      }
    })
  }

}
