import jwt from 'jsonwebtoken';

import TokenConfigs from '@config/Tokens';
import { Tokens, SignProps } from '@src/interfaces/Tokens';



class JwtToken implements Tokens {
    sign(payload: SignProps) {
        return jwt.sign(payload, process.env.JWT_SECRET!, TokenConfigs)
    }

    verify(token: string): SignProps | boolean {
        try {
            const payload = <SignProps>jwt.verify(token, process.env.JWT_SECRET!)
            return payload;
        } catch (err) {
            return false;
        }
    }
}

export default new JwtToken();