import mongoose from './client';
import Employee from './employee.schema';
export class MongodbService {
    private Employee: mongoose.Model<any>;
    constructor() {
        this.connect();
        this.Employee = mongoose.model('Employee', Employee);
    }
    async connect() {
        await mongoose.connect('mongodb://127.0.0.1:27017/basesource');
        console.log('Connected to mongodb');
    }
    async addData(data: any, id: any) {
        // data.id = Number(id);
        data.date_of_birth = new Date(data.date_of_birth);
        data.start_date = new Date(data.start_date);
        try {
            const employee = await this.Employee.create(data);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    async update(id: number, data: any) {
        await this.Employee.updateOne({ id: id }, data);
    }
    async delete(id: number) {
        await this.Employee.deleteOne({ id: id });
    }
}
