import {BlogType} from "../types/types";
import {BlogModel} from "./db";

export const blogsRepository = {
    async getBlogs(
            searchTerm: string | undefined,
            pageNumber: number,
            pageSize: number,
            sortBy: string,
            sortDirection: string) {
        const filter: any = {}
        if (searchTerm) {
            filter.name = {$regex: searchTerm, $options: 'i'}
        }
        let totalCount = await BlogModel.count(filter)
        let pageCount = Math.ceil( +totalCount / pageSize)
        const sortFilter: any = {}
        switch (sortDirection) {
            case ('Asc'): sortFilter[sortBy] = 1
                break
            case ('Desc'): sortFilter[sortBy] = -1
                break
        }
        return {
            "pagesCount": pageCount,
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": totalCount,
            "items": await BlogModel
                .find(filter, {projection:{_id: 0}})
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .lean()
        }
    },
    async getBlogById(blogId: string): Promise<BlogType | null> {
        return BlogModel.findOne({id: blogId});
    },
    async createBlog(newBlog: BlogType): Promise<BlogType> {
            await BlogModel.create(newBlog)
            return newBlog
    },
    async updateBlog(blogId: string, name: string, websiteUrl: string): Promise<boolean> {
        let result = await BlogModel.updateOne({id: blogId}, {$set: {name, websiteUrl}})
        return result.matchedCount === 1
    },
    async deleteBlog(blogId: string): Promise<boolean> {
        let result = await BlogModel.deleteOne({id: blogId})
        return result.deletedCount === 1
    },
    async deleteAll() {
        await BlogModel.deleteMany({})
    }
}