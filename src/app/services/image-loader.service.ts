import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FileItem } from '../models/file-item.model';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  private IMAGE_FOLDER = 'img';

  constructor( private firestore: AngularFirestore) {
    // this.chats = firestore.collection('chats').valueChanges();
    // this.chats.subscribe( data => console.log(data));
   }

   private guardarImagen( image: { nombre: string, url: string} ) {
     this.firestore.collection(`${this.IMAGE_FOLDER}`).add( image );
   }

   cargarImagenesFireBase( images: FileItem[] ): void {
     console.log(images);
   }
}
