import { injectable } from 'inversify';
import { ValidatePhoneInterface } from '../../interfaces/employee.interface';
import 'reflect-metadata';
@injectable()
export class ValidatePhone implements ValidatePhoneInterface {
    public validate(phoneNumber: string): boolean {
        let regex = new RegExp('^[0-9]{1,12}$');
        return regex.test(phoneNumber);
    }
}
