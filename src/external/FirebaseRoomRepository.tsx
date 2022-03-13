import Room from "../data/Room";
import { RoomRepository } from "../data/RoomRepository";
import firestore from '@react-native-firebase/firestore';

export class FirebaseRoomRepository implements RoomRepository {
    async getDefault() {
        const doc = await firestore().collection('rooms').doc('default').get();
        const room = doc.data();
        console.log(room)
        return {
            id: 'default',
            name: room?.name || 'Default',
            activeUsers: room?.activeUsers || [],
        };       
    };

    
}

export default FirebaseRoomRepository