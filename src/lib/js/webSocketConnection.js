import ioClient from 'socket.io-client';
const ENDPOINT = '/';

const socket = ioClient(ENDPOINT, {
    withCredentials: true,
});

export default socket;