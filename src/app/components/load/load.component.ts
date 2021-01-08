import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item.model';
import { ImageLoaderService } from '../../services/image-loader.service';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  files: FileItem[] = [];

  constructor(private imageLoaderService: ImageLoaderService) { }

  ngOnInit(): void {
  }

  cargarImagenes(): void {
    this.imageLoaderService.cargarImagenesFireBase( this.files );
  }

}
