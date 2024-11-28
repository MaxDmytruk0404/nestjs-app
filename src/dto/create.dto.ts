import { IsJSON } from "class-validator";

export class CreateDto {
    @IsJSON()
    info: any
}