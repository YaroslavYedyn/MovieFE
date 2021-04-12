export interface IQuery {
  title?: string;
  genre?: [string];
  page?: number;
  not_genre?: [string];
  year?: string;
  sortBy?: string;
  order?: string;
  limit?: number;
}
