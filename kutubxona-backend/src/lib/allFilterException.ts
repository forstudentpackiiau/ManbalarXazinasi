import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResData } from './resData';



@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost:HttpAdapterHost){}
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const {httpAdapter} = this.httpAdapterHost

    const ctx = host.switchToHttp()

    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    let message = exception.message

    if(Array.isArray(exception['response']?.['message'])){
      message = exception['response']['message'].join(', ')
    }

    const resdata = new ResData<null>(httpStatus, message)

    httpAdapter.reply(ctx.getResponse(), resdata, resdata.meta.statusCode)
  }
}
