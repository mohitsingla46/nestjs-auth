import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class BookDto{
    @IsNotEmpty()
    title: string;

    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    inStock: boolean;
}