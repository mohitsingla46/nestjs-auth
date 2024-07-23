import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from '../auth/schemas/role.schema';
import { Category } from '../category/schemas/category.schema';
import { BookService } from '../book/book.service';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        private bookService: BookService
    ) { }

    async seed() {
        const roles = [
            { name: 'ADMIN' },
            { name: 'VENDOR' },
            { name: 'USER' },
        ];

        for (const role of roles) {
            const existingRole = await this.roleModel.findOne({ name: role.name });
            if (!existingRole) {
                await this.roleModel.create(role);
                this.logger.log(`Inserted role: ${role.name}`);
            } else {
                this.logger.log(`Role ${role.name} already exists`);
            }
        }

        const categories = [
            {
                name: 'Fiction',
                books: [
                    {
                        title: "The Whispering Shadows",
                        description: "In a quaint, fog-covered village nestled deep within the mountains, secrets are whispered by the shadows.",
                        price: 19.99,
                        inStock: true
                    },
                    {
                        title: "Eternal Echoes",
                        description: "'Eternal Echoes' follows the journey of two souls destined to be together across lifetimes.",
                        price: 15.99,
                        inStock: true
                    }
                ]
            },
            {
                name: 'Non-Fiction',
                books: [
                    {
                        title: "The Science of Happiness",
                        description: "The Science of Happiness delves into the latest research in psychology and neuroscience to uncover the secrets of a fulfilling and joyful life.",
                        price: 24.99,
                        inStock: true
                    },
                    {
                        title: "Innovation Nation: How Technology is Transforming Our World",
                        description: "Innovation Nation provides a compelling look at how cutting-edge technologies are reshaping industries, economies, and daily life.",
                        price: 24.99,
                        inStock: true
                    }
                ]
            },
            {
                name: 'Children',
                books: [
                    {
                        title: "The Magical Adventures of Luna the Unicorn",
                        description: "Join Luna, a spirited young unicorn with a heart full of curiosity, as she embarks on enchanting adventures through mystical forests and sparkling rivers.",
                        price: 14.99,
                        inStock: true
                    },
                    {
                        title: "Oliver and the Enchanted Forest",
                        description: "Oliver, a curious and adventurous boy, stumbles upon a hidden, enchanted forest in his backyard.",
                        price: 12.99,
                        inStock: true
                    }
                ]
            },
            {
                name: 'Science Fiction',
                books: [
                    {
                        title: "Echoes of the Infinite",
                        description: "In a distant future where humanity has colonized the stars, Captain Alaric and his crew uncover a mysterious artifact with the power to alter time and space.",
                        price: 21.99,
                        inStock: true
                    },
                    {
                        title: "The Quantum Enigma",
                        description: "When brilliant physicist Dr. Mira Patel accidentally opens a gateway to a parallel dimension, she discovers a world strikingly similar yet fundamentally different from our own.",
                        price: 18.99,
                        inStock: true
                    }
                ]
            }
        ];

        for (const category of categories) {
            let categoryAdded = null;
            const existingCategory = await this.categoryModel.findOne({ name: category.name });
            if (!existingCategory) {
                categoryAdded = await this.categoryModel.create(category);
                this.logger.log(`Inserted category: ${category.name}`);
            } else {
                categoryAdded = await this.categoryModel.findOne({name: category.name});
                this.logger.log(`Category ${category.name} already exists`);
            }

            if (categoryAdded) {
                for (const bookData of category.books) {
                    const book = {
                        ...bookData, 
                        category: new Types.ObjectId(categoryAdded._id).toString()
                    };
                    await this.bookService.addbook(book);
                    this.logger.log(`Inserted book: ${bookData.title}`);
                }
            }
        }
    }
}
