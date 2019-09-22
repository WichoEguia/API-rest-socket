import { Controller, Get } from '../../core/decorators';

@Controller('ping')
export class PingController {
  @Get()
  public index() {
    return 'Respuesta';
  }
}
