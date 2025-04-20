export class Video {
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

  static fromFile(file: any): Video {
    return new Video(file.id, file.originalname, file.size, 'Video description');
  }
}
