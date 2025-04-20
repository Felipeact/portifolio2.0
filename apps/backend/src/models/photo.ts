export class Photo {
  id: number;
  title: string;
  size: number;
  description: string;

  constructor(id: number, title: string, size: number, description: string) {
    this.id = id;
    this.title = title;
    this.size = size;
    this.description = description;
  }

  static fromFile(file: any): Photo {
    return new Photo(file.id, file.originalname, file.size, 'Photo description');
  }
}
