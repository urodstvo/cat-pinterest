import { IsString } from 'class-validator';

export class AddLikeDTO {
  @IsString()
  catId: string;
}
