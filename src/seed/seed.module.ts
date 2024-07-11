import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../auth/schemas/role.schema';
import { SeedService } from './seed.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    ],
    providers: [SeedService],
})
export class SeedModule { }