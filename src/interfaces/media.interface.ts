export interface GenerateThumbnailInterface {
    generate(file: string, filename: string, numberOfFrames: number): any;
}
export interface ConvertFileTypeInterface {
    convert(filetype: string): string;
}
export interface MediaUploadInterface {
    upload(req: any, res: any, next: any): any;
    setInfo(
        req: any,
        videoQuality: number,
        aspectRatio: string,
        thumbnailNumber: number,
    ): any;
    printInfo(): any;
}
export interface ResizeVideoInterFace {
    resize(
        inputFilePath: string,
        width: number,
        height: number,
        outputFilePath: string,
        fileName: string,
        fileType: string,
    ): any;
}
