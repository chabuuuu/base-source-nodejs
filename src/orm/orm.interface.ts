interface ORMInterface {
    connect(): Promise<void>;
    addData(req: any, res: any, next: any): Promise<void>;
    readData(req: any, res: any, next: any): Promise<void>;
}
export { ORMInterface };
