import { Response } from 'express';
import { GoogleService } from './google.service';
export declare class GoogleController {
    private googleService;
    constructor(googleService: GoogleService);
    auth(): Promise<void>;
    googleAuthCallback(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
