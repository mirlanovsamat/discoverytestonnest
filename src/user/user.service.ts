import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
  ){}

  async save(user): Promise<UserEntity>{
    return await this.userRepository.save(user)
  }

  async findById(id: number): Promise<UserEntity>{
    return await this.userRepository.findOne({where: {id: id}})
  }

  async findByEmail(email){
    return await this.userRepository.findOne({where: {email: email}})
  }

  async findByUsername(username){
    return await this.userRepository.findOne({where: {username: username}})
  }

}
