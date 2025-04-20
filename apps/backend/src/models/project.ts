import { Photo } from "./photo";
import { Video } from "./video";

export class Project {
    constructor(
      public id: string,
      public type: string,
      public engine: string,
      public title: string,
      public description: string,
      public photos: Photo[] = [],
      public videos: Video[] = []
    ) {}
  }
  