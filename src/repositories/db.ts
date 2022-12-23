import {MongoClient} from 'mongodb'
import mongoose from 'mongoose'
import {
    BlogType,
    PostType,
    UserDBType,
    CommentDBType,
    EmailConfirmationDBType,
    TokenDBType,
    DeviceAuthSessionType,
    TimeStampType,
    RecoveryCodeType
} from '../types/types'

const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"
const mongoForMongooseUri = process.env.mongoForMongooseURI || "mongodb://0.0.0.0:27017/testDB"

export const client = new MongoClient(mongoUri)

let dbName = "testDB"
let db = client.db(dbName)

export const usersCollection = db.collection<UserDBType>('users')
export const commentsCollection = db.collection<CommentDBType>('comments')
export const emailConfirmationsCollection = db.collection<EmailConfirmationDBType>('confirmations')
export const blacktockensCollection = db.collection<TokenDBType>('tokenBlackList')
export const deviceAuthSessionsCollection = db.collection<DeviceAuthSessionType>('deviceAuthSessions')
export const timeStampsCollection = db.collection<TimeStampType>('timeStamps')
export const recoveryCodesCollection = db.collection<RecoveryCodeType>('recoveryCodes')

const BlogSchema = new mongoose.Schema<BlogType>({
    id: {type: String, required: true},
    name: {type: String, required: true},
    websiteUrl: {type: String, required: true},
    description: {type: String, required: true},
    createdAt: {type: Date, required: true}
}
//todo instance method for case insensitive regex query
/*,
    {methods: {
        caseInsRegexQuery(searchTerm) {
            return mongoose.model('blogs').find({name: {$regex: searchTerm, $options: 'i'}})
        }
    }
}*/)
export const BlogModelClass = mongoose.model('blogs', BlogSchema)

const PostSchema = new mongoose.Schema<PostType>({
    id: {type: String, required: true},
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    bloggerName: {type: String, required: true},
    createdAt: {type: Date, required: true},
})
export const PostModel = mongoose.model('posts', PostSchema)

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