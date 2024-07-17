import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/books.schemas';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { User, UserSchema } from 'src/auth/schemas/users.schema';
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
