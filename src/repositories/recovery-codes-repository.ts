import {recoveryCodesCollection} from "./db";
import {RecoveryCodeType} from "../types/types";

export const recoveryCodesRepository = {
    async create(recoveryCode: RecoveryCodeType) {
        await recoveryCodesCollection.insertOne(recoveryCode)
    },
    async findByRecoveryCode(recoveryCode: string): Promise<RecoveryCodeType | null> {
        return await recoveryCodesCollection.findOne({recoveryCode})
    },
    async deleteAll() {
        await recoveryCodesCollection.deleteMany({})
    }
}