import {MongoClient} from 'mongodb'
import mongoose from 'mongoose'
import {
    BlogType,
    postDBType,
    UserDBType,
    CommentDBType,
    EmailConfirmationDBType,
    TokenDBType,
    DeviceAuthSessionType,
    TimeStampType,
    RecoveryCodeType
} from '../types/types'

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
const mongoForMongooseUri = 'mongodb+srv://andrei_shylovich:tDEU6uF8SedAaKvy@cluster0.huoctrk.mongodb.net/testDB?retryWrites=true&w=majority'

export const client = new MongoClient(mongoUri)

let dbName = "testDB"
let db = client.db(dbName)

export const postsCollection = db.collection<postDBType>('posts')
export const usersCollection = db.collection<UserDBType>('users')
export const commentsCollection = db.collection<CommentDBType>('comments')
export const emailConfirmationsCollection = db.collection<EmailConfirmationDBType>('confirmations')
export const blacktockensCollection = db.collection<TokenDBType>('tokenBlackList')
export const deviceAuthSessionsCollection = db.collection<DeviceAuthSessionType>('deviceAuthSessions')
export const timeStampsCollection = db.collection<TimeStampType>('timeStamps')
export const recoveryCodesCollection = db.collection<RecoveryCodeType>('recoveryCodes')

const blogSchema = new mongoose.Schema<BlogType>({
    id: String,
    name: String,
    websiteUrl: String,
    description: String,
    createdAt: Date
})
export const BlogModel = mongoose.model('blogs', blogSchema)

export async function runDb() {
    try {
        // Connect the client to the server
        await client.connect()
        await mongoose.connect(mongoForMongooseUri)

        console.log("Connected successfully to mongo server")

    } catch {
        console.log("Can't connect to db")
        // Ensures that the client will close when you finish/error
        await client.close()
        await mongoose.disconnect()
    }
}