import QuizType from './Quiz.model';
import Submit from './Submit.model';
import User from './User.model';

export default interface Submittion {
  _id: string;
  quiz: QuizType;
  user: User;
  createdAt: Date;
  score: number;
  time: number;
  submit: Submit[];
}
