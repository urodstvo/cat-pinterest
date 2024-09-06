import {
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LikeEntity } from './entities/like.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getLikes(userId: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['likes'],
    });
    return user.likes;
  }

  async addLike(userId: string, catId: string) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const like = new LikeEntity();
      like.cat_id = catId;
      like.user = user;

      return await this.likeRepository.save(like);
    } catch {
      throw new MethodNotAllowedException('Invalid input');
    }
  }

  async deleteLike(likeId: string) {
    try {
      return await this.likeRepository.delete({ id: likeId });
    } catch {
      throw new NotFoundException();
    }
  }
}
