import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  user={email:"",password:"",name:"",numberofreviews:0}

  constructor(public afauth: AngularFireAuth, private router: Router,
  private tc: ToastController) { }

  ngOnInit() {
  }

  signUpWithEmail(email: string, password: string) {
    console.log(email,password);
    this.afauth.createUserWithEmailAndPassword(email, password).then(user => {
   console.log(user.user.email, user.user.uid);

   var db = firebase.firestore();
   db.collection("users").add({
     'uid':user.user.uid,'name':this.user.name,'numberofreviews':0
   })
   .then(function(docRef) {
     console.log("usertype written with id: ",docRef.id);
   })
   .catch(function(error) {
     console.error("Error adding document: ",error);
   })
 })
 .catch(error => {
   const toast = document.createElement('ion-toast');
   toast.message = error;
   toast.color = "danger";
   toast.duration = 2000;
   document.body.appendChild(toast);
   return toast.present();
  });;
   this.router.navigateByUrl('/home');
}

back(){
  this.router.navigate(["/home"]);
}


}
