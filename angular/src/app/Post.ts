export class Post {
  id?: number;
  author: number;
  featured_media: number;
  content: string;
  status: 'publish';
  acf: Acf;
}

export class Acf {
  likes: any;
}
