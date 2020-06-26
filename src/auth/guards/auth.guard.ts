import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { Repository } from "typeorm";
import 'dotenv/config'
import { AuthPayload } from "../interfaces/authpayload.interface";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: AuthPayload) {
    const { id } = payload
    const user = this.userRepository.findOne({where: {id: id}});
    if(!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}