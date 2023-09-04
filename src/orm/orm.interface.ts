interface ORMInterface {
    connect(): Promise<void>;
    addData(req: any, res: any, next: any): Promise<void>;
    readData(): Promise<void>;
    updateData(id: number, data: EmployeeData): Promise<void>;
    deleteData(id: number): Promise<void>;
    findData(id: number): Promise<void>;
}
interface EmployeeData {
    full_name: string;
    gender: string;
    email: string;
    job_title: string;
    salary: number;
}
export { ORMInterface, EmployeeData };
