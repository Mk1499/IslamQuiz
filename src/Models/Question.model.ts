import Answer from './Answer.model';

export default interface QuestionType {
  id: String;
  type: String;
  label: String;
  answers?: Answer[];
}
