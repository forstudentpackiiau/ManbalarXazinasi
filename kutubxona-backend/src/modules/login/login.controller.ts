import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { configration } from 'src/common/config/env';
import { CreateLoginDto } from './dto/login.create';

@Controller('login')
export class LoginController {
  @Post()
  create(@Body() dto:CreateLoginDto) {
    if(dto.login === configration.KUTUBXONACHI_LOGINI && dto.parol === configration.KUTUBXONACHI_PAROLI){
      return {
        isAcsess:true,
        createAcsess:true,
        deleteAcsess:true,
        editAcsess:true
      }
    }else if(dto.login === configration.USTOZ_LOGINI && dto.parol === configration.USTOZ_PAROLI){
      return {
        isAcsess:true,
        createAcsess:false,
        deleteAcsess:false,
        editAcsess:false
      }
    } else {
      return {
        isAcsess:false
      }
    }
  } 
}
