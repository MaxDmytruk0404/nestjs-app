import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService, private readonly dataSource: DataSource) {}

  async checkDBConnection(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      console.error('Database connection error:', error);
      return false;
    }
  }

  // Збереження інформації коли користувач зареєструвався
  async save(dto: any) {
    return this.databaseService.post.create({
      data: {
        data: dto,
      },
    });
  }

  // Перевірка при воході чи є цей користувач в базі диних
  async checkEmail(email: string): Promise<boolean> {
    const post = await this.databaseService.post.findFirst({
      where: {
        data: {
          path: '$.email',
          equals: email,
        },
      },
    });

    return post !== null;
  }

  // отримання інформації про користувача
  async getUserInfo(email: string): Promise<any> {
    const user = await this.databaseService.post.findFirst({
      where: {
        data: {
          path: '$.email',
          equals: email,
        },
      },
    });


    return user?.data ?? null;
  }

  // Додавання рейтингу в масив films
  async addRaiting(data: any, email: string): Promise<any> {

    const user = await this.databaseService.post.findFirst({
      where: {
        data: {
          path: '$.email',
          equals: email, 
        },
      },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return this.databaseService.post.update({
      where: {
        id: user.id,
      },
      data: {
        data: data
      }

    });
  }

  // Отримання коментарів
  async getComentaries(comentarId: string): Promise<any> {
    const user = await this.databaseService.post.findFirst({
      where: {
        data: {
          path: '$.comentarId',
          equals: comentarId, 
        },
      },
    });

    return user?.data ?? null;
  }

  // Додавання нових коментарів до масиву
  async sendComentar(data: any, filmId: string): Promise<any> {
    const user = await this.databaseService.post.findFirst({
      where: {
        data: {
          path: '$.comentarId',
          equals: filmId, 
        },
      },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return this.databaseService.post.update({
      where: {
        id: user.id,
      },
      data: {
        data: data
      }

    });
  }
}
