import { RegisterService } from './register.service';
import { SigninDto, SignupDto } from './tools';
export declare class RegisterController {
    private registerService;
    constructor(registerService: RegisterService);
    signup(dto: SignupDto): Promise<{
        access_token: String;
    }>;
    signin(dto: SigninDto): Promise<{
        access_token: String;
    }>;
}
