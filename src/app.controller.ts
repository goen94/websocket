import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BusService } from './modules/bus/bus.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly busService: BusService,
  ) {}

  @Get()
  getHello(): string {
    this.appService.socket.emit('location', {
      lat: -8.794243906248559,
      long: 115.16052700848996,
    });
    return this.appService.getHello();
  }

  @Get('test')
  async testEmitTrip() {
    const buses = await this.busService.findAllBus();
    this.appService.socket.emit('bus', buses);
    // aaaa
    return this.appService.getHello();
  }
}
