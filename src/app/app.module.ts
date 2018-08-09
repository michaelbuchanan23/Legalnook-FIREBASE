import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDOaP2UZWRfJsvXnGRWKlbYRG-XjvgrHHg",
    authDomain: "legalnook-fe46b.firebaseapp.com",
    databaseURL: "https://legalnook-fe46b.firebaseio.com",
    projectId: "legalnook-fe46b",
    storageBucket: "legalnook-fe46b.appspot.com",
    messagingSenderId: "94526440572"
  };

import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { routing } from './app.routing';
import { UserFormComponent } from './user/user-form/user-form.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
