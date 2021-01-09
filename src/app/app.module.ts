import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';

import { AppRoutesModule } from './app.routes';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    LoadComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
