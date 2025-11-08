// client.ts
import {
  ConstructorProps,
  SendEmailParams,
  SendEmailResponse,
  AutoSendError,
  SendBulkEmailResponse,
  SendBulkEmailParams,
  CreateContactParams,
  CreateContactResponse,
  RemoveContactsParams,
  RemoveContactsResponse,
} from "./types";

export class AutoSendClient {
  private apikey: string;
  private baseUrl: string;

  constructor({
    apikey,
    baseUrl = "https://api.autosend.com/v1",
  }: ConstructorProps) {
    this.apikey = apikey;
    this.baseUrl = baseUrl;
  }

  private async handleRequest<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof AutoSendError) throw error;

      if (error instanceof Error) {
        throw new AutoSendError({ message: error.message });
      }

      throw new AutoSendError({ message: "An unknown error occurred" });
    }
  }

  async sendEmail(params: SendEmailParams): Promise<SendEmailResponse> {
    return this.handleRequest(async () => {
      const response = await fetch(`${this.baseUrl}/mails/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apikey}`,
        },
        body: JSON.stringify(params),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new AutoSendError({
          message:
            body.message || `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          response: body,
        });
      }

      if (!body.success) {
        throw new AutoSendError({
          message: body.message || "AutoSend request failed",
          response: body,
        });
      }

      return body.data;
    });
  }

  async sendBulkEmail(
    params: SendBulkEmailParams
  ): Promise<SendBulkEmailResponse> {
    return this.handleRequest(async () => {
      const response = await fetch(`${this.baseUrl}/mails/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apikey}`,
        },
        body: JSON.stringify(params),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new AutoSendError({
          message:
            body.message || `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          response: body,
        });
      }

      if (!body.success) {
        throw new AutoSendError({
          message: body.message || "Bulk email request failed",
          response: body,
        });
      }

      return body.data;
    });
  }
  async createContact(
    params: CreateContactParams
  ): Promise<CreateContactResponse> {
    return this.handleRequest(async () => {
      const response = await fetch(`${this.baseUrl}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apikey}`,
        },
        body: JSON.stringify(params),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new AutoSendError({
          message:
            body.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          response: body,
        });
      }

      if (!body.success) {
        throw new AutoSendError({
          message: body.message || "AutoSend request failed",
          response: body,
        });
      }

      return body.data;
    });
  }
  async upsertContact(
    params: CreateContactParams
  ): Promise<CreateContactResponse> {
    return this.handleRequest(async () => {
      const response = await fetch(`${this.baseUrl}/contacts/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apikey}`,
        },
        body: JSON.stringify(params),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new AutoSendError({
          message:
            body.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          response: body,
        });
      }

      if (!body.success) {
        throw new AutoSendError({
          message: body.message || "AutoSend request failed",
          response: body,
        });
      }

      return body.data;
    });
  }
  async removeContacts(
    params: RemoveContactsParams
  ): Promise<RemoveContactsResponse> {
    return this.handleRequest(async () => {
      const response = await fetch(`${this.baseUrl}/contacts/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apikey}`,
        },
        body: JSON.stringify(params),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new AutoSendError({
          message:
            body.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
          response: body,
        });
      }

      if (!body.success) {
        throw new AutoSendError({
          message: body.message || "AutoSend request failed",
          response: body,
        });
      }

      return { success: body.success };
    });
  }
}
