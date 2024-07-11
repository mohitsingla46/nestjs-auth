import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe, UseGuards } from "@nestjs/common";
import { BookDto } from "./dto/books.dto";
import { Book } from "./schemas/books.schemas";
import { BookService } from "./book.service";
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from "src/auth/roles.decorator";

@Controller('book')
@UseGuards(AuthGuard)

export class BookController {
    constructor(private bookService: BookService) { }

    @Post('add_book')
    @UseGuards(AuthGuard)
    @Roles('ADMIN','VENDOR')
    @UsePipes(ValidationPipe)
    async addbook(@Body() book: BookDto): Promise<Book> {
        return this.bookService.addbook(book);
    }

    @Get('list')
    @UseGuards(AuthGuard)
    @Roles('ADMIN','VENDOR','USER')
    async getbooks() {
        return this.bookService.getbooks();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @Roles('ADMIN','VENDOR','USER')
    async getBook(@Param('id') id: string): Promise<Book | { message: string }> {
        return this.bookService.getbookbyid(id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    @Roles('ADMIN','VENDOR')
    async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
        await this.bookService.deletebookbyid(id);
        return { message: 'Book deleted successfully' };
    }
}