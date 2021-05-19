import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import JwtToken from '@src/Tokens/Jwt';

describe('Jwt', () => {
    let jwtToken = '';
    const user_id = 'asdsasdads';
    it('should return that access_token is invalid', async () => {
        const token = 'saddsa';
        const isJwtValid = JwtToken.verify(token);
        expect(isJwtValid).toBe(false);
    });
    it('should return a valid access_token', async () => {
        const jwtData = { user_id };
        jwtToken = JwtToken.sign(jwtData);
        const isTokenvalid = JwtToken.verify(jwtToken);
        expect(isTokenvalid).toHaveProperty('user_id');
    });
    it('should return a user_id from the jwtToken', async () => {
        const jwtData = <{ user_id: string }>JwtToken.verify(jwtToken);
        expect(jwtData).toHaveProperty('user_id');
        expect(jwtData.user_id).toBe(user_id);
    });
});