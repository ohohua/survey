import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { Observable } from 'rxjs'

interface JwtUserData {
  id: string
  username: string
  exp?: number
}

declare module 'express' {
  interface Request {
    user: JwtUserData
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector

  @Inject(JwtService)
  private jwtService: JwtService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()
    const response: Response = context.switchToHttp().getResponse()

    const requireLogin = this.reflector.getAllAndOverride('auth', [
      context.getClass(),
      context.getHandler(),
    ])

    if (!requireLogin) {
      return true
    }

    const authorization = request.headers.authorization

    if (!authorization) {
      throw new UnauthorizedException('用户未登录')
    }

    try {
      const data = this.jwtService.verify<JwtUserData>(authorization)

      request.user = {
        id: data.id,
        username: data.username,
      }

      const { exp = 0 } = data

      const now = Math.floor(Date.now() / 1000)

      // 小于1天
      if (exp - now < 60 * 60 * 24) {
        response.header(
          'token',
          this.jwtService.sign(
            {
              id: data.id,
              username: data.username,
            },
            {
              expiresIn: '7d',
            },
          ),
        )
      }

      return true
    }
    catch {
      throw new UnauthorizedException('token 失效，请重新登录')
    }
  }
}
