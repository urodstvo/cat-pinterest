import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesService } from './like.service';
import { LikesController } from './like.controller';
import { AuthModule } from 'src/auth/auth.module';
import { LikeEntity } from './entities/like.entity';
import { UserEntity } from 'src/auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
