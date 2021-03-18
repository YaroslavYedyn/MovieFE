import {IMovie} from './IMovie';

export interface IResponse {
  count: number;
  data: [IMovie];
  limit: number;
  page: number;
  pages: number;
}
