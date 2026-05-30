import client from "./client";
import { Account, ID } from "appwrite";

class AuthService{

     client = client;
    
     account;

     constructor(){                         

        this.account=new Account(this.client) 
     }

     // async use kiya kyuki Appwrite se data aane me time lagta hai
     // await code ko wait karwata hai jab tak response na aa jaye

     async createAccount({email,password,name}){

        // destructuring use kiya taaki direct email,password,name mil jaye
        // baar baar obj.email likhne ki zarurat na pade

        try {

            // ID.unique() har user ko unique id deta hai
            // await isliye kyuki ye database/server operation hai

            const userAccount=await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // agar account successfully create ho gaya
            if(userAccount){

                    // signup ke turant baad login kara rahe hain
                    return this.login({email,password});   
            }
            else{

                // agar account create nahi hua to jo response aaya wo return
                return userAccount;
            }
        } catch (error) {

            // agar koi error aaye to usko upar throw kar do
            // taaki frontend usko handle kar sake

            throw error;
        }
     }

     async login({email,password}){

        // login function email-password session create karta hai

        try{

            // createEmailSession user ko authenticate karta hai
            return await this.account.createEmailPasswordSession(email,password);

        }
        catch(error){

            // login fail hone par error throw
            throw error;
        }
     }

     async getCurrentUser(){

        // currently login user ki details lane ke liye

        try {

            // account.get() current logged in user return karta hai
            return await this.account.get()

        } catch (error) {

            // agar user login nahi hai ya error aaya
            
            return null
        }

        // fallback return
        return null;
     }

     async logout(){

        // user ke saare active sessions delete kar dega

        try {

            return await this.account.deleteSessions();

        } catch (error) {

            // logout me error aaye to throw
            throw error 
        }
     }

}



// yaha object export kar rahe hain taaki pure app me same instance use ho
// aur directly authService.login(), authService.logout() waise access kar sake
// new AuthService() se object create ho raha hai

export default new AuthService();