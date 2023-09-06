interface ORMInterface {
    connect(): Promise<void>;
    addData(data: any): Promise<void>;
    readData(filter: object): Promise<void>;
    updateData(id: number, data: any): Promise<void>;
    deleteData(id: number): Promise<void>;
    findData(id: number): Promise<void>;
}
// interface EmployeeData {
//     full_name: string;
//     gender: string;
//     email: string;
//     job_title: string;
//     salary: number;
// }
export { ORMInterface };
