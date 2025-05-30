import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateProductDto {
	@IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
	name: string;

	@IsString({ message: 'La descripción del producto debe ser una cadena de texto' })
	description?: string;

	@IsNumber({}, { message: 'El precio debe ser un número' })
	price: number;

	@IsNumber({}, { message: 'El descuento debe ser un número decimal' })
	@Min(0)
	@Max(1)
	discount?: number;
}
