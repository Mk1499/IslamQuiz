import {io} from 'socket.io-client';
import config from '../Config/config';

export const socket = io(config.socketURL);
