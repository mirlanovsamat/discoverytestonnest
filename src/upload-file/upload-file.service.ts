import { UserService } from 'src/user/user.service';
import { AdapterService } from './../adapter/adapter.service';
import { UploadFileEntity } from './entities/upload-file.entity';
import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository';
import { builtinModules } from 'module';

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private readonly uploadFileRepository: Repository<UploadFileEntity>,
    private readonly adapterService: AdapterService,
  ){}

  async readFile(filename, decode){
    const file = await this.uploadFileRepository.findOne({where: {name: filename, user: decode.id}})
    const readStream = await this.adapterService.readFile(filename, decode.username) 
    return {file, readStream}
  }
  
  async updateFile(body){
    const fileDto = {
      name: body.filename,
      mimetype: body.mimetype,
      size: body.size,
      user: body.decode.id
    }
    const updatedFile = await this.uploadFileRepository.update({name: body.filename, user: body.decode.id}, fileDto)
    if(updatedFile.affected === 0){
      await this.uploadFileRepository.save(fileDto)
    }
    await this.adapterService.writeFile(body)
  }
}
