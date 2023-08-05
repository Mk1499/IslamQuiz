export default interface User {
  _id: string;
  name: string;
  email: string;
  points: number;
  verified: boolean;
  role: string;
  rank: Number;
  photo: string;
  submissions: string;
  quote: string;
  profileLocked: boolean;
}
