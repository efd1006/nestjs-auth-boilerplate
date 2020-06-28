import { Module } from '@nestjs/common';
import { RedisClientService } from './redis.service';
import { RedisModule } from 'nestjs-redis';

@Module({
  providers: [RedisClientService],
  exports: [RedisClientModule, RedisClientService]
})
export class RedisClientModule {}
