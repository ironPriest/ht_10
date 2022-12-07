import {Request, Response, Router} from "express";
import {commentsRouter} from "./comments-router";
import {bloggersService} from "../domain/bloggers-service";
import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {postsRepository} from "../repositories/posts-db-repository";
import {usersRepository} from "../repositories/users-repository";
import {deviceAuthSessionsRepository} from "../repositories/device-auth-sessions-repository";
import {commentsRepository} from "../repositories/comments-repository";
import {emailConfirmationRepository} from "../repositories/emailconfirmation-repository";
import {blacktockensRepository} from "../repositories/blacktockens-repository";
import {timeStampsRepository} from "../repositories/time-stamps-repository";
import {recoveryCodesRepository} from "../repositories/recovery-codes-repository";

export const testingRouter = Router({})

testingRouter.delete('/all-data', async (req: Request, res: Response) => {
    await bloggersRepository.deleteAll()
    await postsRepository.deleteAll()
    await usersRepository.deleteAll()
    await commentsRepository.deleteAll()
    await emailConfirmationRepository.deleteAll()
    await blacktockensRepository.deleteAll()
    await deviceAuthSessionsRepository.deleteAll()
    await timeStampsRepository.deleteAll()
    await recoveryCodesRepository.deleteAll()

    res.sendStatus(204)
})