export class User {
  constructor(username: string, firstname: string, lastname: string, password: string, email: string, avatar: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
    this.meta = new Meta(avatar);
  }
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  acf: Acf;
  meta: Meta;
  password: string;
}

export class Meta {
  constructor(avatar: string) {
    this.avatar = avatar;
  }
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
