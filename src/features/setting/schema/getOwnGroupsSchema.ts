export interface OwnGroup {
  id: string;
  photo_url: string;
  name: string;
  type: string;
  total_members: number;
}

export interface OwnGroupsResponse {
  lists: OwnGroup[];
  paid_groups: number;
  free_groups: number;
  total_members: number;
}
