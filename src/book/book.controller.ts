import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { BookDto } from "./dto/books.dto";
import { Book } from "./schemas/books.schemas";
import { BookService } from "./book.service";

@Controller('book')
export class BookController{
    constructor(private bookService: BookService){}

    @Post('add_book')
    @UsePipes(ValidationPipe)
    async addbook(@Body() book: BookDto): Promise<Book>{
        return this.bookService.addbook(book);
    }

    @Get('/list')
    async getbooks(){
        return this.bookService.getbooks();
    }
}