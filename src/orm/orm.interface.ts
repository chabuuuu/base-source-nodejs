interface ORMInterface {
    connect(): Promise<void>;
    addData(): Promise<void>;
    readData(): Promise<void>;
    // Thêm các phương thức khác tùy theo nhu cầu
}
interface ORM {
    addData(): any;
    readData(): any;
}
export { ORM, ORMInterface };
