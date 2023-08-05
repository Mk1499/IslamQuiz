import User from './User.model';

export default interface ReduxState {
  auth: {
    userToken: string;
    userData: User;
  };
  fireConfig: {
    activeBuildNumber: number;
    playStoreURL: string;
    facebookURL: string;
    showSocial: boolean;
    instagramURL: string;
  };
}
