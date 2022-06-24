import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
  ){}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({where: {email: createUserDto.email}});
    const userByUsername = await this.userRepository.findOne({where: {username: createUserDto.username}});

    if(userByEmail || userByUsername) {
        throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({where: { email: loginUserDto.email}})

    if(!user) {
      throw new HttpException('Такого пользователя не существует', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(loginUserDto.password, user.password);

    if(!isPasswordCorrect) {
      throw new HttpException('Неверный пароль', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const token = this.generateJwt(user)
    delete user.password
    const result = Object.assign(user, token)
    return result
  }

  generateJwt(user: UserEntity){
    const token = sign({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
    return {token}
  }

}
