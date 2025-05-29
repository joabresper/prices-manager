import { IsString } from "class-validator";

export class RegisterAuthDto {
	@IsString()
	name: string;

	@IsString()
  	email: string;

	@IsString()
  	password: string;
}
