import { injectable } from 'inversify';
import { ValidatePasswordInterface } from '../../interfaces/employee.interface';
import 'reflect-metadata';
@injectable()
export class ValidatePassword implements ValidatePasswordInterface {
    public validate(password: string): boolean {
        let regex = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,8}$/,
        );
        return regex.test(password);
    }
}
