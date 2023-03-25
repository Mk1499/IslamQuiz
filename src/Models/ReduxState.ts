import User from './User.model';

export default interface ReduxState {
  auth: {
    userToken: string;
    userData: User;
  };
}
