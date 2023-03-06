import {get} from './api-service';

export const getCategoris = async () => {
  let url = '/category';
  const cats = await get(url);
  return cats;
};

export const preData = async () => {
  let url = '/quiz/predata';
  const data = await get(url);
  return data;
};
