import User from './User.model';

export default interface Friendship {
  _id: string;
  status: string;
  from: User;
  to: User;
  users: [User];
  createdAt: Date;
  updatedAt: Date;
}
