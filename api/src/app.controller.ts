import { Controller, Get } from '@nestjs/common';

import { Public } from './decorators/public.decorator';
import { AppService } from './app.service';

@Public()
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
