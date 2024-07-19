import { HttpException, Injectable } from "@nestjs/common";
import { Book } from "./schemas/books.schema";
import { BookDao } from './book.dao';

@Injectable({})
export class BookService {
    constructor(private readonly bookDao: BookDao) { }

    async addbook(book: Book): Promise<Book> {
        try {
            return await this.bookDao.create(book);
        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async getbooks() {
        try {
            return await this.bookDao.find();
        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async getbookbyid(id: string): Promise<Book | { message: string }> {
        try {
            const book = await this.bookDao.findById(id);
            if (!book) {
                return { message: 'Book not found' };
            }
            return book;
        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }
    }

    async deletebookbyid(id: string): Promise<Book> {
        try {
            return await this.bookDao.findByIdAndDelete(id);
        }
        catch (error) {
            console.error('An error occurred:', error.message);
        }
    }
}