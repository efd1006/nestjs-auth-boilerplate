import { Injectable, UnauthorizedException, HttpException, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { Repository } from "typeorm";
import 'dotenv/config'
import { AuthPayload } from "../interfaces/authpayload.interface";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
    })
  }

  async validate(payload: AuthPayload) {
    const { id } = payload
    const user = this.userRepository.findOne({where: {id: id}});
    if(!user) {
      throw new HttpException('Invalid refresh token.', HttpStatus.BAD_REQUEST)
    }
    return user
  }
}