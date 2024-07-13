import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";

export class BookDto{
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty()
    inStock: boolean;
}