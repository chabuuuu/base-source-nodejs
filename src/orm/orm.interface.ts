interface ORMInterface {
    connect(): Promise<void>;
    addData(req: any, res: any, next: any): Promise<void>;
    readData(): Promise<void>;
}
export { ORMInterface };
