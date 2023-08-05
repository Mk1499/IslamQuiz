import User from './User.model';

export default interface FriendRequest {
  _id: string;
  from: User;
  createdAt: Date;
  status: string;
}
