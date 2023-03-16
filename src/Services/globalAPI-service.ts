import {get} from './api-service';

export function sendOTP() {
  const url = '/user/resendCode';
  get(url);
}
