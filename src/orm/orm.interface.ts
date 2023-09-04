interface ORMInterface {
    connect(): Promise<void>;
    addData(req: any, res: any, next: any): Promise<void>;
    readData(): Promise<void>;
    updateData(id: number, data: object): Promise<void>;
    deleteData(id: number): Promise<void>;
}
export { ORMInterface };
