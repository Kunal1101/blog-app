import { useId } from "react";
import conf from "../conf/conf";
import { Client, Account, ID, Databases, Query, Storage } from "appwrite";

export class Services {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPoste({ title, content, slug, status, userId, fetauredImage }) {
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
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
      throw new Error(e);
    }
  }

  async getPosts(queries = [Query.equal("status", "equal")]) {
    try {
      return this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (e) {
      throw new Error(e);
    }
  }
}
