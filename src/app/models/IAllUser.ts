import {IUser} from './IUser';

export interface IAllUser {
  count: number;
  data: [IUser];
  limit: number;
  page: number;
  pages: number;
}
