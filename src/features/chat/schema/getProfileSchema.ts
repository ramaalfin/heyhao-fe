export interface Role {
  id: string;
  role: string;
}

export interface Member {
  joined_at: string;
}

export interface Room {
  members: Member[];
}

export interface Group {
  name: string;
  type: string;
  room: Room;
  photo_url: string;
}

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  photo_url: string;
  role: Role;
  created_at: string;
  groups: Group[];
}
