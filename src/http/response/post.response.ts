import { BaseResponse } from './../base.response';

export interface PostEntityResponse extends BaseResponse {
  title: string;
  subTitle?: string;
  content: string;
  userId: string;
}
