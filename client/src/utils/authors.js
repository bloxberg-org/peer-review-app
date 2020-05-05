import { get } from './endpoint';

export const getAllAuthorNames = () => {
  return get('/authors/');
};