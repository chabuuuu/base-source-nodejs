export class ValidatePhone {
    validate(phoneNUmber: string): boolean {
        let regex = new RegExp('^[0-9]{1,12}$');
        return regex.test(phoneNUmber);
    }
}
