import QuestionType from './Question.model';

export default interface QuizType {
  id: String;
  title: String;
  description: String;
  noOfQuestions: Number;
  noOfSubmissions: Number;
  difficulty: String;
  cover: String;
  time: Number;
  date: Date;
  questions: QuestionType[];
}
