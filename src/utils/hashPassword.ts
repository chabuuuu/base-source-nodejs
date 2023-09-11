import * as bcrypt from 'bcrypt';
const saltRounds = 10;
export class HashPassword {
    async hash(password: string): Promise<void> {
        try {
            const salt = await bcrypt.genSaltSync(saltRounds);
            const hash: any = await bcrypt.hashSync(password, salt);
            return hash;
        } catch (error) {
            throw new Error('Cant hash password');
        }
    }
    async compare(password: string, hash: string): Promise<void> {
        try {
            const result: any = await bcrypt.compareSync(password, hash); // true
            return result;
        } catch (error) {
            throw new Error('Cant compare password');
        }
    }
}
