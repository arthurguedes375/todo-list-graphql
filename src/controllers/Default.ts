import { RouterFunction, Request, Response } from '@src/interfaces/Router';

// Interfaces
interface IDefaultController {
    index: RouterFunction;
};


class DefaultController implements IDefaultController {

    constructor() {
        this.index = this.index.bind(this);
    }

    async index(req: Request, res: Response) {
        return res.status(200).json({ message: process.env.HTTP_PORT });
    }
}

export default DefaultController;