import {IMovie} from './IMovie';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  wishlist: any;
  age: number;
  gender: string;
  name: string;
  _wishlist: [IMovie];
}
