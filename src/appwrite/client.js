import conf from "../conf-env/conf";
import { Client } from "appwrite";

const client = new Client()
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appProjectId);

export default client;
