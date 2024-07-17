import { Injectable } from "@nestjs/common";
import { Book } from "./schemas/books.schemas";
import { BookDao } from './book.dao';

@Injectable({})
export class BookService {
    constructor(private readonly bookDao: BookDao) { }

    async addbook(book: Book): Promise<Book> {
        return await this.bookDao.create(book);
    }

    async getbooks() {
        return await this.bookDao.find();
    }

    async getbookbyid(id: string): Promise<Book | {message: string}> {
        const book = await this.bookDao.findById(id);
        if (!book) {
            return { message: 'Book not found' };
        }
        return book;
    }

    async deletebookbyid(id: string): Promise<Book> {
        return await this.bookDao.findByIdAndDelete(id);
    }
}