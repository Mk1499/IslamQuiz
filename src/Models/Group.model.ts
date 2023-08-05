import User from './User.model';

export default interface Group {
  title: string;
  users: User[];
  creator: User;
  status: string;
  createdAt: Date;
}
