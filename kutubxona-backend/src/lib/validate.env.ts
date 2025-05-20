import { HttpException, HttpStatus } from "@nestjs/common"
import { configration } from "src/common/config/env"
import { serverSchema } from "src/common/schema/env.validate"
class ValidateError extends HttpException {
    constructor(){
        super("validatsiyadan otmadi serverda muommo!", HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
export async function validate(){
    const {error} = await serverSchema.validate(configration)

    if (error) {
        throw new ValidateError()
    }
}