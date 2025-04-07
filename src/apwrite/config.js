import conf from "../conf/conf";
import { Client, Account, Databases, Query } from "appwrite";

export class Services {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, slug, status, userId, fetauredImage }) {
    try {
      return this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          fetauredImage,
          status,
          userId,
        }
      );
    } catch (e) {
      throw new Error("Appwrite services:: Create document", e);
    }
  }

  async updatePost(slug, { title, content, fetauredImage, status, userId }) {
    try {
      return this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          fetauredImage,
          status,
          userId,
        }
      );
    } catch (e) {
      throw new Error("Appwrite services:: Update document", e);
    }
  }

  async deletePost(slug) {
    try {
      this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (e) {
      throw new Error("Appwrite services:: Delete document", e);
    }
  }

  async getPost(slug) {
    try {
      return this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (e) {
      throw new Error("Appwrite services:: Get post", e);
    }
  }

  async getPosts() {
    try {
      return this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [Query.equal("status", "equal")]
      );
    } catch (e) {
      throw new Error("Appwrite services:: Get all posts", e);
    }
  }
}

const services = new Services();
export default services;
