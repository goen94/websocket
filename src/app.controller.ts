import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.appService.socket.emit('location', {
      lat: -8.794243906248559,
      long: 115.16052700848996,
    });
    return this.appService.getHello();
  }
}
