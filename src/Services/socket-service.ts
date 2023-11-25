import {io} from 'socket.io-client';

const url = 'http://192.168.1.8:4040';

export const socket = io(url);
