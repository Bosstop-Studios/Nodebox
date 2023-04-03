import ioClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5173';

const socket = ioClient(ENDPOINT, {
    withCredentials: true,
});

export default socket;