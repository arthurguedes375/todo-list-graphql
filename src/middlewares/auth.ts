import { Request, Response, NextFunction } from 'express';

// QueryBuilder
import { QueryBuilder } from '@interfaces/QueryBuilder';

// Interfaces
import { Tokens } from '@src/interfaces/Tokens';
interface IAuth {
    logged(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
};

class Auth implements IAuth {

    constructor(
        private QueryBuilder: QueryBuilder,
        private Token: Tokens,
    ) {
        this.logged = this.logged.bind(this);
    }

    async logged(req: Request, res: Response, next: NextFunction) {
        try {
            const token = <string>req.headers.authentication;
            const tokenPayload = <{ user_id: string }>this.Token.verify(token!);

            if (!tokenPayload) return res.status(401).json({ message: "You need to be authenticated to access this route, Invalid Access Token" });


            const user_id = tokenPayload.user_id;

            const [user_email] = await this.QueryBuilder<{ email: string }[]>('users')
                .select('email')
                .where({
                    id: user_id,
                })
                .exec();

            if (!user_email) return res.status(401).json({ message: "You need to be authenticated to access this route, Invalid Access Token" });

            req.current_user = {
                id: user_id,
                email: user_email.email,
            };

            return next();
        } catch (err) {
            return res.status(401).json({ message: "You need to be authenticated to access this route, Invalid Access Token" });
        }
    }
}

export default Auth;