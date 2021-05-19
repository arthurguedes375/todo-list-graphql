import { BaseCustom, CustomRequest, CustomHeaders, CustomParams, CustomQuery } from '@src/Router/Custom';

export interface Headers extends CustomHeaders { }
export interface Params extends CustomParams { }
export interface Query extends CustomQuery { }

export interface Request<B = object, H = Headers, P = Params, Q = Query> extends CustomRequest {
    body: B;
    headers: H;
    params: P;
    query: Q;
}

export type NextFunction = () => any;
export type SetReqFunction = (key: string, value: any) => any;

export interface Response {
    status: (status: number) => Response;
    json: (res: object | string | number) => Response;
}

export type RouterFunction<B = object, H = Headers, P = Params, Q = Query> = (req: Request<B, H, P, Q>, res: Response, next?: NextFunction) => Promise<Response> | Response;