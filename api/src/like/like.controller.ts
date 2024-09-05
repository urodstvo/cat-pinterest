import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { LikesService } from './like.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AddLikeDTO } from './dto/add-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getLikes(@User() user) {
    return this.likesService.getLikes(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addLike(@User() user, @Body() dto: AddLikeDTO) {
    return this.likesService.addLike(user.id, dto.catId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':likeId')
  async dropLike(@Param('likeId') likeId: string) {
    return this.likesService.deleteLike(likeId);
  }
}
