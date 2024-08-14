import { BaseResponse } from '../base.response';
import { RoleEnum } from '@/enums';

export interface UserEntityResponse extends BaseResponse {
  userName: string;
  thumbnailUrl?: string;
  role: RoleEnum;
}

export interface PostSignInResponse {
  accessToken: string;
  refreshToken: string;
}
