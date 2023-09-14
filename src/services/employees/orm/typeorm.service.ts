import { ORMInterface } from '../../../interfaces/orm.interface';
import { Employee } from '../../../entities/Employee';
import { AppDataSource } from '../../../data-source/index';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import {
    HashPasswordInterface,
    ValidateEmailInterface,
    ValidatePasswordInterface,
    ValidatePhoneInterface,
} from '../../../interfaces/employee.interface';
import {
    HASHPASSWORD,
    VALIDATEEMAIL,
    VALIDATEPASSWORD,
    VALIDATEPHONE,
} from '../../../config/types/employee.type';
const db = require('../../../data-source/index');
const validateSchema = require('../../../Schema/EmployeeSchema');

@injectable()
export class TypeORMService implements ORMInterface {
    private hashPassWord: HashPasswordInterface;
    private validateEmail: ValidateEmailInterface;
    private validatePassword: ValidatePasswordInterface;
    private validatePhone: ValidatePhoneInterface;
    constructor(
        @inject(HASHPASSWORD) hashPassword: HashPasswordInterface,
        @inject(VALIDATEEMAIL) validateEmail: ValidateEmailInterface,
        @inject(VALIDATEPASSWORD) validatePassword: ValidatePasswordInterface,
        @inject(VALIDATEPHONE) validatePhone: ValidatePhoneInterface,
    ) {
        this.hashPassWord = hashPassword;
        this.validateEmail = validateEmail;
        this.validatePassword = validatePassword;
        this.validatePhone = validatePhone;
    }
    async connect() {
        // Kết nối với TypeORM
        db.connect();
    }
    async addData(data: any): Promise<void> {
        if (validateSchema(data) == false) {
            throw new Error(validateSchema.errors[0].message);
        }
        const emailUnique = await AppDataSource.manager.find(Employee, {
            where: {
                email: data.email,
            },
        });
        if (emailUnique.length != 0) {
            console.log('Duplicate email');
            throw new Error('Duplicate email');
        }
        if (this.validateEmail.validate(data.email) == false) {
            console.log('Invalid email');
            throw new Error('Invalid email');
        }
        if (this.validatePassword.validate(data.password) == false) {
            console.log('Invalid password');
            throw new Error('Invalid password');
        }
        data.password = await this.hashPassWord.hash(data.password);
        if (this.validatePhone.validate(data.phone_number) == false) {
            console.log('Invalid phone number');
            throw new Error('Invalid phone number');
        }
        await AppDataSource.manager.save(Employee, data);
        console.log('Employee has been saved by typeorm');
        const respond: any = data;
        return respond;
    }
    async readData(
        filter: any,
        page: any,
        perPage: any,
        skip: any,
    ): Promise<void> {
        const monthBirth = filter.monthBirth;
        const gender = filter.gender;
        perPage = perPage?.toString();
        skip = skip?.toString();
        const pageQuery = `LIMIT ${perPage} OFFSET ${skip}`;
        let employeeQuerry = 'SELECT * FROM "Employee"';
        if (monthBirth != null || gender != null) {
            employeeQuerry += ' WHERE ';
        }
        if (monthBirth != null) {
            employeeQuerry +=
                'EXTRACT(MONTH FROM date_of_birth) = ' + monthBirth;
        }
        if (monthBirth != null && gender != null) {
            employeeQuerry += ' AND ';
        }
        if (gender != null) {
            employeeQuerry += "gender = '" + gender + "'";
        }
        employeeQuerry += pageQuery;

        const data = await AppDataSource.manager.query(employeeQuerry);
        const totalCountQuery = `SELECT COUNT(*) AS total FROM "Employee"`;
        const totalCount = await AppDataSource.manager.query(totalCountQuery);
        console.log(data);
        const result: any = {
            data: data,
            page: page,
            perPage: perPage,
            totalCount: totalCount[0],
        };
        return result;
    }
    async deleteData(id: number): Promise<void> {
        await AppDataSource.manager.delete(Employee, { id: id });
    }
    async updateData(id: number, data: any): Promise<void> {
        var schema = {
            full_name: data.full_name,
            date_of_birth: data.date_of_birth || '',
            gender: data.gender || '',
            address: data.address || '',
            phone_number: data.phone_number || '',
            email: data.email || '',
            job_title: data.job_title || '',
            start_date: data.start_date || '',
            salary: data.salary || '',
            profile_picture: data.profile_picture || '',
            password: data.password || '',
        };
        Object.assign(schema, data);
        if (validateSchema(schema) == false) {
            throw new Error(validateSchema.errors[0].message);
        }
        if (data.email != null) {
            const emailUnique = await AppDataSource.manager.find(Employee, {
                where: {
                    email: data.email,
                },
            });
            if (emailUnique.length != 0) {
                console.log('Duplicate email');
                throw new Error('Duplicate email');
            }
            if (this.validateEmail.validate(data.email) == false) {
                console.log('Invalid email');
                throw new Error('Invalid email');
            }
        }
        if (data.password != null) {
            if (this.validatePassword.validate(data.password) == false) {
                console.log('Invalid password');
                throw new Error('Invalid password');
            }
        }
        if (data.phone_number != null) {
            if (this.validatePhone.validate(data.phone_number) == false) {
                console.log('Invalid phone number');
                throw new Error('Invalid phone number');
            }
        }
        await AppDataSource.manager.update(Employee, { id: id }, data);
    }
    async login(email: string, password: string): Promise<void> {
        const result: any = await AppDataSource.manager.find(Employee, {
            where: {
                email: email,
            },
        });
        if (result[0] == null) {
            throw new Error('Error: User does not exist');
        }
        const match: any = await this.hashPassWord.compare(
            password,
            result[0].password,
        );
        if (match) {
            return result[0];
        } else {
            throw new Error('Error: Login failed');
        }
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}
