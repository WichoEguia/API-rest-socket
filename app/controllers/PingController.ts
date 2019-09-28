import { Controller, Post, Param } from '../../core/decorators';

@Controller('ping')
export class PingController {
  @Post('/:id')
  public index(@Param('id') id: any) {
    return id;
  }
}
