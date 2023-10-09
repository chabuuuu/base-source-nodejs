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
import BaseError from '../../../utils/BaseError';
import { HttpStatusCode } from '../../../utils/ErrorStatusCode';
const db = require('../../../data-source/index');
const { schema, validate } = require('../../../Schema/EmployeeSchema');
const jwt = require('jsonwebtoken');

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
        await db.connect();
    }
    async addData(data: any): Promise<void> {
        if (validate(data) == false) {
            const schemaProperties = Object.keys(schema.properties);
            const userProperties = Object.keys(data);
            const missingColumns = schemaProperties.filter(
                (column) => !userProperties.includes(column),
            );
            const extraColumns = userProperties.filter(
                (column) => !schemaProperties.includes(column),
            );
            if (missingColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must have required properties: ' + missingColumns,
                );
            }
            if (extraColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must not have properties: ' + extraColumns,
                );
            }
            throw new BaseError(
                HttpStatusCode.UNPROCESSABLE_ENTITY,
                'fail',
                validate.errors[0].message,
            );
        }
        const emailUnique = await AppDataSource.manager.find(Employee, {
            where: {
                email: data.email,
            },
        });
        if (emailUnique.length != 0) {
            console.log('Duplicate email');
            throw new BaseError(
                HttpStatusCode.CONFLICT,
                'fail',
                'Duplicate email',
            );
        }
        if (this.validateEmail.validate(data.email) == false) {
            console.log('Invalid email');
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'Invalid email',
            );
        }
        if (this.validatePassword.validate(data.password) == false) {
            console.log('Invalid password');
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'Invalid password',
            );
        }
        data.password = await this.hashPassWord.hash(data.password);
        if (this.validatePhone.validate(data.phone_number) == false) {
            console.log('Invalid phone number');
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'Invalid phone number',
            );
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
        try {
            const data = await AppDataSource.manager.query(employeeQuerry);
            const totalCountQuery = `SELECT COUNT(*) AS total FROM "Employee"`;
            const totalCount =
                await AppDataSource.manager.query(totalCountQuery);
            console.log(data);
            const result: any = {
                data: data,
                page: page,
                perPage: perPage,
                totalCount: totalCount[0],
                from: 'typeorm',
            };
            return result;
        } catch (error: any) {
            console.error(error);
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                error.message,
            );
        }
    }
    async deleteData(id: number): Promise<void> {
        const result: any = await AppDataSource.manager.find(Employee, {
            where: {
                id: id,
            },
        });
        if (result[0] == null) {
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'User does not exist',
            );
        }
        try {
            await AppDataSource.manager.delete(Employee, { id: id });
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
    }
    async updateData(id: number, data: any): Promise<void> {
        var updateSchema = {
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
        Object.assign(updateSchema, data);
        if (validate(updateSchema) == false) {
            const schemaProperties = Object.keys(schema.properties);
            const userProperties = Object.keys(updateSchema);
            const missingColumns = schemaProperties.filter(
                (column) => !userProperties.includes(column),
            );
            const extraColumns = userProperties.filter(
                (column) => !schemaProperties.includes(column),
            );
            if (missingColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must have required properties: ' + missingColumns,
                );
            }
            if (extraColumns.length != 0) {
                throw new BaseError(
                    HttpStatusCode.UNPROCESSABLE_ENTITY,
                    'fail',
                    'Must not have properties: ' + extraColumns,
                );
            }
            throw new BaseError(
                HttpStatusCode.UNPROCESSABLE_ENTITY,
                'fail',
                validate.errors[0].message,
            );
        }
        if (data.email != null) {
            const emailUnique = await AppDataSource.manager.find(Employee, {
                where: {
                    email: data.email,
                },
            });
            if (emailUnique.length != 0) {
                console.log('Duplicate email');
                throw new BaseError(
                    HttpStatusCode.CONFLICT,
                    'fail',
                    'Duplicate email',
                );
            }
            if (this.validateEmail.validate(data.email) == false) {
                console.log('Invalid email');
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'Invalid email',
                );
            }
        }
        if (data.password != null) {
            if (this.validatePassword.validate(data.password) == false) {
                console.log('Invalid password');
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'Invalid password',
                );
            }
        }
        if (data.phone_number != null) {
            if (this.validatePhone.validate(data.phone_number) == false) {
                console.log('Invalid phone number');
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'Invalid phone number',
                );
            }
        }
        const result: any = await AppDataSource.manager.find(Employee, {
            where: {
                id: id,
            },
        });
        if (result[0] == null) {
            throw new BaseError(
                HttpStatusCode.BAD_REQUEST,
                'fail',
                'User does not exist',
            );
        }
        try {
            await AppDataSource.manager.update(Employee, { id: id }, data);
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
    }
    async login(email: string, password: string): Promise<void> {
        try {
            const result: any = await AppDataSource.manager.find(Employee, {
                where: {
                    email: email,
                },
            });
            if (result[0] == null) {
                throw new BaseError(
                    HttpStatusCode.BAD_REQUEST,
                    'fail',
                    'User does not exist',
                );
            }
            const match: any = await this.hashPassWord.compare(
                password,
                result[0].password,
            );
            if (match) {
                const token = jwt.sign(
                    { email: email, password: password },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN },
                );
                console.log(token);
                return token;
            } else {
                throw new BaseError(
                    HttpStatusCode.UNAUTHORIZED,
                    'fail',
                    'Login failed',
                );
            }
        } catch (error: any) {
            throw new BaseError(
                HttpStatusCode.INTERNAL_SERVER,
                'fail',
                error.message,
            );
        }
    }
    async countRecord(): Promise<number> {
        var count = 0;
        const totalCountQuery = `SELECT COUNT(*) AS total FROM "Employee"`;
        const totalCount = await AppDataSource.manager.query(totalCountQuery);
        count = totalCount[0].total;
        return count;
    }

    // Triển khai các phương thức tương tự cho thêm, xóa, sửa dữ liệu
}
