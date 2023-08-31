import { Photo } from '../entities/Photo';
import { AppDataSource } from '../data-source/index';
import { TypeORMService } from '../orm/typeorm.service';
const typeOrmService = new TypeORMService();
export class TypeOrmController {
    async addData(req: any, res: any, next: any) {
        typeOrmService.addData;
        res.send('Done!');
    }
}
