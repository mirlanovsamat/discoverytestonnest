import { AdapterService } from './../adapter/adapter.service';
import { UploadFileEntity } from './entities/upload-file.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UploadFileService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private readonly uploadFileRepository: Repository<UploadFileEntity>,
    private readonly adapterService: AdapterService
  ){}

  async readFile(filename){
    const file = await this.uploadFileRepository.findOne({where: {name: filename}})
    const readStream = await this.adapterService.readFile(filename)
    return {file, readStream}
  }

  async updateFile(body){
    const fileDto = {
      name: body.filename,
      mimetype: body.mimetype,
      size: body.size
    }
    const updatedFile = await this.uploadFileRepository.update({name: body.filename}, fileDto)
    if(updatedFile.affected === 0){
      await this.uploadFileRepository.save(fileDto)
    }
    await this.adapterService.writeFile(body.filename, body.buffer)
  }
}
