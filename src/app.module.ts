import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://root:MAeRWjyDrgLLcJjVYCVVlRWjERxNfBTl@junction.proxy.rlwy.net:23277/railway',
      autoLoadEntities: true, 
      synchronize: true, 
    }),
    DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
