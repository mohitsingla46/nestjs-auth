import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Book{
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    inStock: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);