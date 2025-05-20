import { HttpException, HttpStatus } from "@nestjs/common";

export class KategoriyaMavjudligi extends HttpException {
    constructor(){
        super("bu id li kategoriya mavjud emas", HttpStatus.NOT_FOUND)
    }
}

export class KategoriyaNomi extends HttpException {
    constructor(){
        super("bunday nomli kategoriya allaqachon mavjud", HttpStatus.BAD_REQUEST)
    }
}