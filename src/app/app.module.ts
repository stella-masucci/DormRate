import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';

const firebaseConfig = {
  apiKey: "AIzaSyDRj4dOUa5ZXmwsxgiOswKiMjV-MeZFSY8",
   authDomain: "dormrate.firebaseapp.com",
   projectId: "dormrate",
   storageBucket: "dormrate.appspot.com",
   messagingSenderId: "1073211160828",
   appId: "1:1073211160828:web:ab7ceb17bfb76c9fdd3f79",
   measurementId: "G-Q57G5YT0W0"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
