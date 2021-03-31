import {IUser} from './IUser';

export interface IComment {
  _id: string;
  movie_id: string;
  user_id: string;
  comment: string;
  createdAt: string;
  user: [IUser];
}
