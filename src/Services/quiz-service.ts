import {del, get} from './api-service';

export const getCategoris = async () => {
  let url = '/category';
  const cats = get(url);
  return cats;
};

export const preData = async () => {
  let url = '/quiz/predata';
  const data = get(url);
  return data;
};

export const deleteQuiz = async (id: string) => {
  let url = `/quiz/${id}`;
  del(url);
};
