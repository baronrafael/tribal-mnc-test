import { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { validate } from "class-validator";

import { User } from "../Entities/User";

class UserController {

    static index = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            //We dont want to send the passwords on response
            select: ["id", "firstName", "lastName", "email"]
        });
        //Send the users object
        res.send(users);
    };

    static show = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: any = req.params.id;
        //Get the user from database
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, {
                //We dont want to send the passwords on response
                select: ["id", "firstName", "lastName", "email"]
            });
            res.send(user);
        } catch (error) {
            res.status(404).send("El recurso solicitado no existe");
        }
    };

    static store = async (req: Request, res: Response) => {
        
        //Get parameters from the body
        let { firstName, lastName, email, password } = req.body;
        let user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;

        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Hash the password, to securely store on DB
        user.hashPassword();

        //Try to save. If fails, the email is already in use
        const userRepository = getRepository(User);
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(401).send("Este email ya esta en uso");
            return;
        }

        //If all ok, send 201 response
        res.status(201).send();
    };

    static update = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;

        //Get values from the body
        const { firstName, lastName } = req.body;

        //Try to find user on database
        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("El recurso solicitado no existe");
            return;
        }

        //Validate the new values on model
        user.firstName = firstName;
        user.lastName = lastName;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }

        //Try to safe, if fails, that means email already in use
        try {
            await userRepository.save(user);
        } catch (e) {
            res.status(409).send("Este email ya esta en uso");
            return;
        }
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

    /**
     * Delete users
     * 
     * @param {any}     req
     * @param {any}     res
     */
    static destroy = async (req: Request, res: Response) => {
        //Get the ID from the url
         const id = req.params.id;

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("Usuario no encontrado");
            return;
        }
        userRepository.delete(id);

        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };

}

export default UserController;
