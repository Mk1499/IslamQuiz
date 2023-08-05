import Answer from './Answer.model';

export default interface QuestionType {
  _id: String;
  type: String;
  label: String;
  answers?: Answer[];
}
