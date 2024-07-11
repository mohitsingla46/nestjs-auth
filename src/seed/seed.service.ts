import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../auth/schemas/role.schema';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { }

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
    }
}
