/**
 * @key redis key
 * @value redis value it can be a string or object
 * @expiration expiration time on redis in (seconds)
 */
export interface RedisData {
  key: string;
  value: any;
  expiration: number;
}