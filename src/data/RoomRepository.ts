import Room from "./Room";

export interface RoomRepository {
  getDefault: () => Promise<Room>;
}
