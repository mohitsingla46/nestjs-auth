import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe, UseGuards } from "@nestjs/common";
import { BookDto } from "./dto/books.dto";
import { Book } from "./schemas/books.schemas";
import { BookService } from "./book.service";
import { AuthGuard } from '../auth/auth.guard';

@Controller('book')
export class BookController{
    constructor(private bookService: BookService){}

    @Post('add_book')
    @UsePipes(ValidationPipe)
    async addbook(@Body() book: BookDto): Promise<Book>{
        return this.bookService.addbook(book);
    }

    @UseGuards(AuthGuard)
    @Get('list')
    async getbooks(){
        return this.bookService.getbooks();
    }

    @Get(':id')
    async getBook(@Param('id') id:string): Promise<Book | {message: string}>{
        return this.bookService.getbookbyid(id);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id:string): Promise<{message: string}>{
        await this.bookService.deletebookbyid(id);
        return { message: 'Book deleted successfully' }; 
    }
}