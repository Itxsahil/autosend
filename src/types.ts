// types.ts
export interface ConstructorProps {
  apikey: string;
  baseUrl?: string;
}

export interface EmailAddress {
  email: string;
  name?: string;
}

export interface SendEmailParams {
  to: EmailAddress;
  from: EmailAddress;
  subject?: string; // optional when using templateId
  html?: string; // required if not using templateId
  text?: string; // plain text version
  templateId?: string; // required if not using html/text
  dynamicData?: Record<string, any>; // handlebars variables
  replyTo?: EmailAddress;
  unsubscribeGroupId?: string;
}

export interface SendEmailResponse {
  emailId: string;
  status: string;
}
export interface SendBulkEmailParams {
  recipients: EmailAddress[];
  from: EmailAddress;
  subject?: string;
  html?: string;
  text?: string;
  templateId?: string;
  dynamicData?: Record<string, any>;
  replyTo?: EmailAddress;
  unsubscribeGroupId?: string;
}
export interface SendBulkEmailResponse {
  batchId: string;
  totalRecipients: number;
  successCount: number;
  failedCount: number;
}

export interface CreateContactParams {
  email: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  customFields?: Record<string, string>;
}

export interface Contact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  customFields?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface CreateContactResponse extends Contact {}

export interface RemoveContactsParams {
  emails: string[];
}

export interface RemoveContactsResponse {
  success: boolean;
}

export interface ContactResponse {
  success: boolean;
  data: Contact;
}

export interface AutoSendErrorDetails {
  message: string;
  statusCode?: number;
  response?: unknown;
}

export class AutoSendError extends Error {
  public statusCode?: number;
  public response?: unknown;

  constructor(details: AutoSendErrorDetails) {
    super(details.message);
    this.name = "AutoSendError";
    this.statusCode = details.statusCode;
    this.response = details.response;
    Object.setPrototypeOf(this, AutoSendError.prototype);
  }
}
