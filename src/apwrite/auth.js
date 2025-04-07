import { use } from "react";
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique,
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (e) {
      throw new Error(e);
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (e) {
      throw new Error(e);
    }
  }
}

const authService = new AuthService();

export default authService;
