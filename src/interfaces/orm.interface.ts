interface ORMInterface {
    connect(): Promise<void>;
    addData(data: any): Promise<void>;
    readData(filter: object, page: any, perPage: any, skip: any): Promise<void>;
    updateData(id: number, data: any): Promise<void>;
    deleteData(id: number): Promise<void>;
    login(email: string, password: string): Promise<void>;
    countRecord(): Promise<number>;
}
// interface EmployeeData {
//     full_name: string;
//     gender: string;
//     email: string;
//     job_title: string;
//     salary: number;
// }
export { ORMInterface };
