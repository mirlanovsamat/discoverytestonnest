import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
constructor(private readonly userService: UserService){}

    async use(req, res: Response, next: NextFunction) {
        if(!req.headers.authorization) {
            req.user = null
            next()
            return;
        }

        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = verify(token, process.env.JWT_SECRET)
            const user = await this.userService.findById(decode.id)
            req.body.user = user
            next()
        } catch (error) {
            req.user = null;
            next()
        }
    }
}