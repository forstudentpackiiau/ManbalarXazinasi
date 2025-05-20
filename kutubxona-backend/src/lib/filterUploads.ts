import { extname } from "path";
import { BadRequestException } from "@nestjs/common";

const allowedFileTypes = ["png", "jpg", "jpeg", "pdf", "webp"];

export function fileFilter(req, file, callback) {
  const fileExt = extname(file.originalname).slice(1).toLowerCase();

  if (!allowedFileTypes.includes(fileExt)) {
    return callback(new BadRequestException("Faqat PNG, JPG, JPEG va PDF fayllar yuklanishi mumkin!"), false);
  }

  callback(null, true);
}
