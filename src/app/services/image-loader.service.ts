import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { FileItem } from '../models/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  private IMAGE_FOLDER = 'img';
  images: FileItem[] = [];


  constructor( private firestore: AngularFirestore) {}

   private guardarImagen( image: { nombre: string, url: string} ): void {
     this.firestore.collection(`${this.IMAGE_FOLDER}`).add( image );
   }

   cargarImagenesFireBase( images: FileItem[] ): void {
     console.log(images);
     const storageRef = firebase.storage().ref();
     for ( const item of images ) {
       item.loaded = true;
       if ( item.progress >= 100 ) {
        continue;
       }
       const uploadTask: firebase.storage.UploadTask = storageRef.child( ` ${this.IMAGE_FOLDER}/${item.name} `).put( item.file );

       uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: firebase.storage.UploadTaskSnapshot ) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          ( errorUploadTask ) => console.error('Error al subir a firebase ==> ', errorUploadTask),
          () => {
            console.log('imagen cargada correctamente');
            const promise = uploadTask.snapshot.ref.getDownloadURL();
            promise.then( url => {
              item.urlFile = url;
              item.loaded = false;
              this.guardarImagen( {
                nombre: item.name,
                url: item.urlFile
              });
            }).catch( errorPromise => console.error(errorPromise) );
          }
        );

     }
   }

   recuperarImagenes(): Observable<any> {
      return this.firestore.collection('img').valueChanges();
   }
}
