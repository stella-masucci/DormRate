import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})

export class CreateAccountPage implements OnInit {

  registerForm: FormGroup;

  error_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email address: end with ".sc.edu"' }
    ],

    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must have at least 8 characters.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' },
      { type: 'minlength', message: 'Password must have at least 8 characters.' },
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    public afauth: AngularFireAuth, 
    private router: Router,
    private tc: ToastController
  ) {
    this.registerForm = this.formBuilder.group({  
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.sc.edu$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
      confirm_password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])),
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirm_password');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("Create user");
    var self = this;
    var email = this.registerForm.get('email').value;
    var password = this.registerForm.get('password').value;
    this.afauth.createUserWithEmailAndPassword(email, password).then(u => {
      console.log(u.user.email, u.user.uid);

      // Update displayName of FirebaseAuthUser
      var currentUser = firebase.auth().currentUser;
      currentUser.updateProfile({
        displayName: this.registerForm.get('name').value
      }).then(function() {
        console.log('User Profile Updated Successfully');
        console.log("Hello " + currentUser.displayName);
        //self.router.navigate(["/tabs/"]);
      }).catch(function(error) {
        console.log(error);
      });

      firebase.firestore().collection("users").add({
        'uid': u.user.uid,
        'name': this.registerForm.get('name').value,
        'numberofreviews': 0
      }).then(function(docRef) {
        console.log("usertype written with id: ", docRef.id);
        self.router.navigate(["/tabs/dorms"]);
      }).catch(function(error) {
        console.error("Error adding document: ", error);
      });
    }).catch(error => {
      const toast = document.createElement('ion-toast');
      toast.message = error;
      toast.color = "danger";
      toast.duration = 2000;
      document.body.appendChild(toast);
      return toast.present();
    });
  }

  back(){
    this.router.navigate(["/home"]);
  }
}
