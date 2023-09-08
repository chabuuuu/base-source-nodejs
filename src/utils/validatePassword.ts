export class ValidatePassword {
    validate(password: string): boolean {
        let regex = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,8}$/,
        );
        return regex.test(password);
    }
}
