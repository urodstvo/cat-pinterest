import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(id: string) {
    return id;
  }
}
