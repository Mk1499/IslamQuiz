import {User} from '@react-native-google-signin/google-signin';
import DurationType from './Duration.model';
import QuestionType from './Question.model';

export default interface QuizType {
  _id: String;
  title: String;
  description: String;
  noOfQuestions: Number;
  noOfSubmissions: Number;
  difficulty: String;
  cover: String;
  time: Number;
  date: Date;
  questions: QuestionType[];
  submissions: Number;
  points: Number;
  duration: DurationType;
  startDate: Date;
  endDate: Date;
  code: String;
  createdAt: Date;
  user: User;
}
