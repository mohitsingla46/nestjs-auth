import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/books.schema';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { User, UserSchema } from '../auth/schemas/users.schema';
import { BookDao } from './book.dao';

@Module({
    imports: [MongooseModule.forFeature([
        {
            name: Book.name, schema: BookSchema
        },
        {
            name: User.name, schema: UserSchema
        }
    ])],
    controllers: [BookController],
    providers: [BookDao, BookService]
})
export class BookModule { }
