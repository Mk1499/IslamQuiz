import Answer from './Answer.model';
import QuestionType from './Question.model';

export default interface Submit {
  answer: Answer;
  question: QuestionType;
}
