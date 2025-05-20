import { HttpException, HttpStatus } from "@nestjs/common";

export class InventarRaqam extends HttpException {
    constructor(){
        super("bunday inventar raqamda kitob yoq", HttpStatus.NOT_FOUND)
    }
}

export class KitoblarMavjudligi extends HttpException {
    constructor(){
        super("bu kitob allaqachon mavjud", HttpStatus.BAD_REQUEST)
    }
}