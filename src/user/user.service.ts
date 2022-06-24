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

  async findById(id: number): Promise<UserEntity>{
    return await this.userRepository.findOne({where: {id: id}})
  }

}
