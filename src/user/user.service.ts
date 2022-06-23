import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm/repository/Repository';


@Injectable()
export class UserService {
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

  findById(id: number): Promise<UserEntity>{
    return this.userRepository.findOne({where: {id: id}})
  }


  generateJwt(user: UserEntity){
    const token = sign({
      id: user.id,
      username: user.username,
      email: user.email,
    }, process.env.JWT_SECRET, {expiresIn: '1h'})
    return {token}
}

}
