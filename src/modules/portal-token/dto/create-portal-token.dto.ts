import { IsString } from "class-validator";

export class CreatePortalTokenDto {
    @IsString()
    ticketNumber:string;
}
