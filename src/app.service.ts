import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class AppService {
  public socket: Server;

  getHello(): string {
    return 'Hello World!';
  }
}
