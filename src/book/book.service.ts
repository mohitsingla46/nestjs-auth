import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book } from "./schemas/books.schemas";

@Injectable({})
export class BookService{
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>){}

    async addbook(book: Book): Promise<Book>{
        return await this.bookModel.create(book);
    }

    async getbooks(){
        return await this.bookModel.find();
    }
}