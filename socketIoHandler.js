import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);
    const rooms = new Map();

    io.on('connection', (socket) => {

        socket.on('join', (room) => {

            if(rooms.get(room) && rooms.get(room).length == 2) {
                console.log('Room is full, kicking user')
                socket.emit("kick");
                return;
            } else {
                socket.join(room);
                if (!rooms.has(room)) {
                    rooms.set(room, []);
                    rooms.get(room).push(socket.id);
                } else {
                    rooms.get(room).push(socket.id);
                }
    
                socket.to(room).emit('joined', rooms.get(room));
            }
            
        });

        socket.onAny((event,...args) => {
            if(event == 'disconnect') return;
            if(event == 'join') return;
            if(event == 'leave') return;
            
            let room = event.split('-')[0];
            
            if (rooms.has(room)) {
                rooms.get(room).forEach((id) => {
                    socket.to(id).emit(event,...args);
                });
            }
        });

        socket.on('disconnect', () => {
            rooms.forEach((value, key) => {
                if (value.includes(socket.id)) {
                    value.splice(value.indexOf(socket.id), 1);
                    if (value.length == 0) {
                        rooms.delete(key);
                    }
                }
            });
        })

    });

    console.log('SocketIO injected');
}