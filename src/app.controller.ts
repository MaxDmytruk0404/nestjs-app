import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  async hello() {
    return 'hello'
  }

  @Get('cheack-email/:email')
  async cheackEmail(@Param('email') email: string) {
    const exists = await this.appService.checkEmail(email);
    return { exists }
  }
 
  @Get('user-info/:email')
  async getUserInfo(@Param('email') email: string) {
    const exists = await this.appService.getUserInfo(email);
    return { exists }
  }

  @Get('comentaries/:filmId')
  async getComentaries(@Param('filmId') filmId: string) {
    const exists = await this.appService.getComentaries(filmId)
    return {exists}
  }
 
  @Post('create')
  async create(@Body() data:any) {
   return this.appService.save(data)
  }

  @Post(':email/films')
  async addRaiting(@Body() data:any, @Param('email') email: string) {
   return this.appService.addRaiting(data, email)
  }

  @Post(':filmId/comentar')
  async sendComentar(@Body() data:any, @Param('filmId') filmId: string) {
   return this.appService.sendComentar(data, filmId)
  }

}
