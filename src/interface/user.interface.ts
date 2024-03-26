import { RoleEnum } from '@/enum';

export interface User {
  id: string;
  userName: string;
  password: string;
  role: RoleEnum;
  isDeleted: boolean;
  thumbnailUrl?: string;
}
