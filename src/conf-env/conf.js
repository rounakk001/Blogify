const conf={
        appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL)  , // String() ensures ki value hamesha string format me aaye.// Env values mostly already strings hoti hain, // but ye type safety aur consistency ke liye use kiya jata hai.(maan lo kabhi undefined aa gaya to use string bana do bs )
        appProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID) , 
        appDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        appCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID) ,
        appBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID)  ,
        tinymceApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY)    
}

                                                                    

export default conf