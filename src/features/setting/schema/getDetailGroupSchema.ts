export interface DetailGroup {
  id: string;
  name: string;
  about: string;
  type: string;
  benefit: string[];
  assets: Asset[];
  price: number;
  room: Room;
  photo_url: string;
  is_join: boolean;
}

export interface Asset {
  filename: string;
}

export interface Room {
  id: string;
  members: Member[];
  _count: Count;
}

export interface Member {
  user: User;
}

export interface User {
  name: string;
  photo_url: string;
}

export interface Count {
  members: number;
}
