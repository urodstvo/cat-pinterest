import { LikeEntity } from 'src/like/entities/like.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];
}
