export class User {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  acf: Acf;
  meta: Meta;
  password: string;
}

export class Meta {
  avatar?: string;
  slaapdoel?: number;
}

export class Acf {
  friends?: any;
  location?: Location;
}

export class Location {
  address?: string;
  lat: string;
  lng: string;
}
