import { Photo } from './photo';
import { Video } from './video';

export class Project {
  id: number;
  type: string;
  engine: string;
  thumbnail: string;
  title: string;
  description: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  tags: string[]; // <-- New tags field
  photos: Photo[];
  video: Video[];
  createdAt: Date; 
  updatedAt: Date;  

  constructor(
    id: number,
    title: string,
    description: string,
    type: string,
    engine: string,
    thumbnail: string,
    description2: string,
    description3: string,
    description4: string,
    description5: string,
    tags: string[] = [], // <-- Include in constructor
    photos: Photo[] = [],
    video: Video[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.type = type;
    this.engine = engine;
    this.thumbnail = thumbnail;
    this.title = title;
    this.description = description;
    this.description2 = description2;
    this.description3 = description3;
    this.description4 = description4;
    this.description5 = description5;
    this.tags = tags;
    this.photos = photos;
    this.video = video;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromRequest(body: any, photos: Photo[], video: Video[]): Project {
    return new Project(
      0, // ID will be auto-generated
      body.title,
      body.description,
      body.type,
      body.engine,
      body.thumbnail,
      body.description2,
      body.description3,
      body.description4,
      body.description5,
      body.tags || [], // <-- Safely extract tags
      photos,
      video
    );
  }
}
