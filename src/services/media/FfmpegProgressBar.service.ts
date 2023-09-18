const { spawn } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cliProgress = require('cli-progress');

export class FfmpegProgressBar {
    private frameCount: number;
    private getFrameCommand: string;
    private ffmpegArgsCommand: readonly string[];
    private inputFilePath: string;
    constructor(inputFilePath: string) {
        this.frameCount = 0;
        this.getFrameCommand = `ffmpeg -i ${inputFilePath} -map 0:v:0 -c copy -f null -`;
        this.inputFilePath = inputFilePath;
    }
    async exec(ffmpegArgsCommand: readonly string[]): Promise<void> {
        this.ffmpegArgsCommand = ffmpegArgsCommand;
        //Read video frame
        try {
            const { stdout, stderr } = await exec(this.getFrameCommand);
            var inputString = stderr.toString();
            var frameMatch = inputString.match(/frame=\s*(\d+)/g);
            if (frameMatch) {
                var frameValue = Number(frameMatch[1].match(/\d+/));
                this.frameCount = frameValue;
                // console.log(`Tổng số frame: ${frameValue}`);
            } else {
                throw new Error('Can not read frame of this file.');
            }
        } catch (error: any) {
            throw new Error(error);
        }
        // Run the ffmpeg command to resize the video
        const progressBar = new cliProgress.SingleBar(
            {},
            cliProgress.Presets.shades_classic,
        );
        progressBar.start(this.frameCount, 0);
        const ffmpeg = spawn('ffmpeg', this.ffmpegArgsCommand);

        ffmpeg.stderr.on('data', (data: any) => {
            var inputString = data.toString();
            var frameMatch = inputString.match(/frame=\s*(\d+)/);
            if (frameMatch) {
                var frameValue = Number(frameMatch[0].match(/\d+/));
                progressBar.update(frameValue);
            }
        });

        await new Promise<void>((resolve, rejects) => {
            ffmpeg.on('exit', (code: any, signal: any) => {
                if (code === 0) {
                    progressBar.stop();
                    resolve();
                } else {
                    rejects(new Error('Progress failed'));
                }
            });
        });
    }
}
