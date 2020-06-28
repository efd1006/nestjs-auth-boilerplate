
import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export default () => ({
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT) || 6379,
    db: Number(process.env.REDIS_PREFIX) || 0,
    // keyPrefix: parseInt(process.env.REDIS_PREFIX, 10) || 0,

    onClientReady: async (client: Redis | any) => {
      Logger.log('[Redis configuration] Redis initialized successfully');

      await client.setex(
        `connection_status`,
        240,
        `ready at ${new Date().toTimeString()}`,
      );

      client.on('error', (err) => {
        Logger.error({ message: 'Redis encountered an error : ', err });
      });
    },
  },
});