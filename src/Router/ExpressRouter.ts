import { NextFunction, Request as RequestExpress, Response as ResponseExpress } from "express";
import { RouterFunction, Request, Response } from '@src/interfaces/Router';

const ExpressRouter = (func: RouterFunction<any>) => {
    return async (req: any, res: ResponseExpress, next: NextFunction) => {
        const { body, headers, params, query }: any = req;
        const request: Request = {
            body,
            headers,
            params,
            query,
            current_user: <any>req.current_user,
        };
        class response implements Response {
            constructor() {
                this.status = this.status.bind(this);
            }
            status(code: number) {
                res.status(code);
                return this;
            }
            json(json: any) {
                res.json(json);
                return this;
            }
        }
        return await func(req, new response(), next);
    }
}

export default ExpressRouter;