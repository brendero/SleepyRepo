export class Post {
  constructor(description: string, featured_media: number, hashtag: any) {
    this.content = description;
    this.featured_media = featured_media;
    this.categories = hashtag;
  }
  id?: number;
  author: number;
  featured_media: number;
  categories: any;
  content: string;
  status: 'publish';
  acf: Acf;
}

export class Acf {
  likes: any;
}
