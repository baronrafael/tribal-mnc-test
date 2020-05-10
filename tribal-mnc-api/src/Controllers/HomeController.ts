import { Request, Response } from 'express';
import Service from '../Services/InformationService';

class HomeController {

    static index = async (req: Request, res: Response) => {
        const serv = new Service();
        const response = await serv.getInfo(req.params.text, req.params.type, req.body.limit);
        res.send(response);
    }

}

export default HomeController;