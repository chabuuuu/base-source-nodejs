import * as bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { HashPasswordInterface } from '../../interfaces/employee.interface';
import 'reflect-metadata';
const saltRounds = 10;
@injectable()
export class HashPassword implements HashPasswordInterface {
    public async hash(password: string): Promise<void> {
        try {
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash: any = await bcrypt.hashSync(password, salt);
            return hash;
        } catch (error) {
            throw new Error('Cant hash password');
        }
    }
    public async compare(password: string, hash: string): Promise<void> {
        try {
            const result: any = await bcrypt.compareSync(password, hash); // true
            return result;
        } catch (error) {
            throw new Error('Cant compare password');
        }
    }
}
