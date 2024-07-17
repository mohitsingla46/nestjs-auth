import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe, UseGuards } from "@nestjs/common";
import { BookDto } from "./dto/books.dto";
import { Book } from "./schemas/books.schemas";
import { BookService } from "./book.service";
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from "../decorators/roles.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { admin, vendor, user } from "../utils/constants";

@Controller('book')
@UseGuards(AuthGuard)

export class BookController {
    constructor(private bookService: BookService) { }

    @Post('add_book')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor)
    @UsePipes(ValidationPipe)
    async addbook(@Body() book: BookDto): Promise<Book> {
        return this.bookService.addbook(book);
    }

    @Get('list')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor, user)
    async getbooks() {
        return this.bookService.getbooks();
    }

    @Get(':id')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor, user)
    async getBook(@Param('id') id: string): Promise<Book | { message: string }> {
        return this.bookService.getbookbyid(id);
    }

    @Delete(':id')
    @ApiTags('protected')
    @ApiBearerAuth('access-token')
    @Roles(admin, vendor)
    async deleteBook(@Param('id') id: string): Promise<{ message: string }> {
        await this.bookService.deletebookbyid(id);
        return { message: 'Book deleted successfully' };
    }
}