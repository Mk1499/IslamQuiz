export default interface User {
  _id: string;
  name: string;
  email: string;
  points: number;
  verified: boolean;
  role: string;
}