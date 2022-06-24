import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { verify } from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean{
        const req = context.switchToHttp().getRequest();

        if(!req.headers.authorization) {
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        const token = req.headers.authorization.split(' ')[1];
        const decode = verify(token, process.env.JWT_SECRET)
        req.body.decode = decode
        return true
    }
}