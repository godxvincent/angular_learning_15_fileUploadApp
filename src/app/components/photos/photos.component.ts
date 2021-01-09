import { Component, OnInit } from '@angular/core';
import { ImageLoaderService } from '../../services/image-loader.service';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photosLoaded: any;
  constructor(private imageLoaderService: ImageLoaderService) { }

  ngOnInit(): void {
    this.imageLoaderService.recuperarImagenes().subscribe ( data => {
      this.photosLoaded = data;
    });
  }

}
