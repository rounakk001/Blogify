import conf from "../conf-env/conf";
import client from "./client";
import { ID, Databases, Storage, Query } from "appwrite";

export class Service {


    client = client;
    databases;
    bucket;

    constructor() {
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, content, slug, featuredImage, status, userId,name}  ) {
        try {
            return await this.databases.createDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID: userId,
                    name
                }
            )

        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                slug, {
                title, content, featuredImage, status
            }
            )
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error;
            return false; 
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appDatabaseId,
                conf.appCollectionId,
                slug
            )
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async getAllPosts(queries=[Query.equal("status","active")]){
            try {
                return await this.databases.listDocuments(
                    conf.appDatabaseId,
                    conf.appCollectionId,
                    queries
                )
            } catch (error) {
                console.log(error)
                return false;
            }
    }

    //file upload service img ko storage me bhej rahe
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appBucketId,
                fileId
            )      
            return true

        } catch (error) {
            return error;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFileView(
            conf.appBucketId,
            fileId
        )
    }


}


export default new Service();