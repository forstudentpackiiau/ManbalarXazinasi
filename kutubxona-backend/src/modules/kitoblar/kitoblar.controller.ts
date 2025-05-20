import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Inject, UseInterceptors, UploadedFile } from '@nestjs/common';
import { KitoblarService } from './kitoblar.service';
import { CreateKitoblarDto } from './dto/create-kitoblar.dto';
import { UpdateKitoblarDto } from './dto/update-kitoblar.dto';
import { ID } from 'src/common/types/type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import {fileFilter} from "../../lib/filterUploads"
const uploadBasePath = join(__dirname, '../../../uploads')

@Controller('kitoblar')
export class KitoblarController {
  constructor(
    @Inject("IKitoblarService")
    private readonly kitoblarService: KitoblarService
  ){}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          console.log(file);
          
          let folder = 'other';
          if (file.mimetype === 'image/png') {
            folder = 'png';
          } else if (file.mimetype === 'image/jpeg') {
            folder = 'jpeg';
          } else if (file.mimetype === 'application/pdf') {
            folder = 'pdf';
          } else if (file.mimetype === 'application/jpe') {
            folder = 'jpe';
          } else if (file.mimetype === 'image/webp') {
            folder = 'webp';
          } else {
            return new Error('Fayl turi noto‘g‘ri!')
          }
          
          callback(null, join(uploadBasePath, folder));
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter
    })
  )
  uploadFile(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      return { message: 'Fayl yuklanmadi!' };
    }
    const folder =
    file.mimetype === 'image/png' ? 'png' :
    file.mimetype === 'image/jpeg' ? 'jpeg' :
    file.mimetype === 'application/pdf' ? 'pdf' :
    file.mimetype === 'application/jpe' ? 'jpe' :
    file.mimetype === 'image/webp' ? 'webp' :
    null;

    return { url: `http://localhost:3000/uploads/${folder}/${file.filename}` };
  }

  @Post()
  create(@Body() createKitoblarDto: CreateKitoblarDto) {
    return this.kitoblarService.create(createKitoblarDto);
  }

  @Get()
  findAll() {
    return this.kitoblarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ID) {
    return this.kitoblarService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: ID, @Body() updateKitoblarDto: UpdateKitoblarDto) {
    return this.kitoblarService.update(id, updateKitoblarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ID) {
    return this.kitoblarService.delete(id);
  }
}
