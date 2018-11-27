export class User {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  meta: Meta;
  password: string;
}

export class Meta {
  avatar?: string;
  slaapdoel?: number;
}

