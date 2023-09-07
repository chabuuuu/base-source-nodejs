export class ValidateEmail {
    validate(email: string): boolean {
        let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        return regex.test(email);
    }
}
