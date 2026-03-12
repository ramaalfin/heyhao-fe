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
  id: string;
  filename: string;
}

export interface Room {
  id: string;
  members: Member[];
  _count: Count;
}

export interface Member {
  role: Role;
  user: User;
}

export interface Role {
  role: string;
}

export interface User {
  id: string;
  name: string;
  photo_url: string;
}

export interface Count {
  members: number;
}
