export class FileItem {
    public file: File;
    public name: string;
    public urlFile: string;
    public loaded: boolean;
    public progress: number;

    constructor( file: File) {
        this.file = file;
        this.name = file.name;
        this.loaded = false;
        this.progress = 0;
    }
}
