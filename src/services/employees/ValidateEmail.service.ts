import { injectable } from 'inversify';
import { ValidateEmailInterface } from '../../interfaces/employee.interface';
import 'reflect-metadata';
@injectable()
export class ValidateEmail implements ValidateEmailInterface {
    public validate(email: string): boolean {
        let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        return regex.test(email);
    }
}
