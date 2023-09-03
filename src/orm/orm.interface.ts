interface ORMInterface {
    connect(): Promise<void>;
    addData(req: any, res: any, next: any): Promise<void>;
    readData(req: any, res: any, next: any): Promise<void>;
    // Thêm các phương thức khác tùy theo nhu cầu
}
interface ORM {
    addData(): any;
    readData(): any;
}
export { ORM, ORMInterface };
