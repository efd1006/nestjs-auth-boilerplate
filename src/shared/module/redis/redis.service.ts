import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { Redis } from 'ioredis';
import { RedisData } from 'src/shared/interfaces';

@Injectable()
export class RedisClientService {
  
  client: Redis

  constructor(
    private readonly redisService: RedisService
  ) {
    this.client = this.getRedisClient();
  }

  getRedisClient(): Redis {
    return this.redisService.getClient();
  }

  async setValue(data: RedisData): Promise<{ status: string; data: RedisData }> {
    if (!data && !data.key && !data.expiration && !data.value) {
      throw new UnprocessableEntityException('Invalid data values');
    }

    const value =
      typeof data.value === 'string' ? data.value : JSON.stringify(data.value);

    const status = await this.client.setex(data.key, data.expiration, value);

    return {
      status,
      data,
    };
  }

  async getValue(key: string): Promise<any> {
    let value = await this.client.get(key);

    if (!key || !value) {
      value = null
    }

    try {
      value = JSON.parse(value);
    } catch (error) {
      //Logger.error('value was probably a string');
      // all good value is string
    }

    return { value: value };
  }
}
