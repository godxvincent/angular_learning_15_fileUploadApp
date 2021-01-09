import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item.model';

// EventEmitter notificarle al padre que algo a ocurrido
// ElementRef Sirve para tener una relación directa con el elemento HTML que contiene esa directiva
// HostListener Sirve para crear eventos o callbacks cuando algo suceda sobre el elemento HTML
// eventos disponibles https://www.w3schools.com/jsref/dom_obj_event.asp
// Output para darle una respuesta al cliente.

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Input() dirFiles: FileItem[] = [];
  @Output() mouseOnElement: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragOverEvent( event: any ): void {
    this.mouseOnElement.emit( true );
    this.preventAndStop( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeaveEvent( event: any ): void {
    this.mouseOnElement.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDropEvent( event: any ): void {
    const transfer = this.getTransfer(event);
    if ( !transfer ) {
      return;
    }
    this.extractFiles(transfer.files );
    this.preventAndStop( event );
    this.mouseOnElement.emit( false );
  }

  private getTransfer( event: any ): any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extractFiles( fileList: FileList ): void {
    console.log(fileList);
    // tslint:disable-next-line: forin
    for ( const property in Object.getOwnPropertyNames( fileList )) {
      const fileTemp = fileList[property];
      if ( this.canBeLoaded( fileTemp )) {
        const fileFileTemp = new FileItem( fileTemp );
        this.dirFiles.push(fileFileTemp);
      }
    }
    console.log(this.dirFiles);
  }

  private canBeLoaded( file: File ): boolean {
    if ( !this.fileDropped(file.name) && this.isImage(file.type) ) {
      return true;
    } else {
      console.log('El archivo', file.name, 'no pudo ser cargado');
      return false;
    }
  }

  private preventAndStop(event: Event ): void {
    // Esto controla que al arrastrar una imagen al navegador su accion por default sea abierta.
    event.preventDefault();
    // evita que se propague el evento
    event.stopPropagation();
  }

  // Validacion de que el archivo no se haya ya cargado.
  private fileDropped( fileName: string ): boolean  {
    for (const file of this.dirFiles) {
      if ( file.name === fileName ) {
        console.log( `el archivo ${file.name} ya esta agregado `);
        return true;
      }
    }
    return false;
  }

  // Validar que sean imagenes
  private isImage( fileType: string ): boolean {
    return ( fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }
}
