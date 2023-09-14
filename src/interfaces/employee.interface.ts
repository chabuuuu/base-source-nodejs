export interface ConverStringToObjectInterface {
    convert(query: any): any;
}
export interface HashPasswordInterface {
    hash(password: string): any;
    compare(password: string, hash: string): any;
}
export interface ValidateEmailInterface {
    validate(email: string): boolean;
}
export interface ValidatePasswordInterface {
    validate(password: string): boolean;
}
export interface ValidatePhoneInterface {
    validate(phoneNumber: string): boolean;
}
