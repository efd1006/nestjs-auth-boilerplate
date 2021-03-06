import { Injectable, HttpException, HttpStatus, UnprocessableEntityException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs'
import * as md5 from 'md5'
import { AuthPayload } from './interfaces/authpayload.interface';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config'
import { hashPassword } from './utils/util';
import { RedisClientService } from 'src/shared/module/redis/redis.service';
import { RedisData } from 'src/shared/interfaces';

var refreshTokens = {}
@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private redisClient: RedisClientService
  ) {}

  async register(dto: RegisterDTO) {
    let user = await this.userRepository.findOne({where: {email: dto.email}})
    if(user) {
      throw new HttpException('Email Already Exists.', HttpStatus.BAD_REQUEST)
    }
    let hashedPassword = await hashPassword(dto.password)
    dto = {
      ...dto,
      password: hashedPassword
    }

    user = await this.userRepository.create(dto)
    await this.userRepository.save(user)

    return {
      user: user,
      message: 'User registration Successful.'
    }
    
  }

  async login(dto: LoginDTO) {
    const user = await this.userRepository.findOne({where: {email: dto.email}})
    if(!user) {
      throw new HttpException("Invalid Credentials.", HttpStatus.BAD_REQUEST)
    }
    
    const isValid = await bcrypt.compare(dto.password, user.password)
    if(!isValid) {
      throw new HttpException("Invalid Credentials.", HttpStatus.BAD_REQUEST)
    }

    const payload: AuthPayload = {
      id: user.id
    }
    const token = await this.getTokens(payload)
    
    return {
      user: user.toJSON(),
      access_token: token.access_token,
      refresh_token: token.refresh_token
    }

  }

  async refresh(refresh_token: string) {
    try {
      jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_SECRET)
      const data = jwt.decode(refresh_token)
      let redis_data = await this.redisClient.getValue(md5(data["id"]))
      if(redis_data.value && redis_data.value == refresh_token) {
        const payload: AuthPayload = {
          id: data['id']
        }
        const token = await this.getTokens(payload)
        return {
          access_token: token.access_token,
          refresh_token: token.refresh_token
        }
      } else {
        throw new HttpException("Invalid refresh token.", HttpStatus.BAD_REQUEST)
      }
    }catch(error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async getTokens(payload: AuthPayload) {
    const access_token = this.jwtService.sign(payload)
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
    let decoded_refreshtoken = jwt.decode(refresh_token)
    let data: RedisData = {
      key: md5(payload.id),
      value: refresh_token,
      expiration: decoded_refreshtoken['exp']
    }
    this.redisClient.setValue(data)
    return {
      access_token,
      refresh_token
    }
  }

  async decodeJWT(token) {
    return jwt.decode(token)
  }
}
