# AutoSend

A TypeScript SDK for the AutoSend API - a simple and powerful email sending service.

## Installation

```bash
npm install autosend-sdk
```

## Quick Start

```typescript
import { AutoSendClient } from 'autosend-sdk';

// Initialize the client
const client = new AutoSendClient({
  apikey: 'your-api-key-here'
});

// Send an email
const result = await client.sendEmail({
  to: { email: 'recipient@example.com', name: 'John Doe' },
  from: { email: 'sender@example.com', name: 'Your App' },
  subject: 'Hello from AutoSend!',
  html: '<h1>Welcome!</h1><p>This is a test email.</p>'
});

console.log(result); // { emailId: '...', status: 'sent' }
```

## Usage

### Initialize Client

```typescript
import { AutoSendClient } from 'autosend-sdk';

const client = new AutoSendClient({
  apikey: 'your-api-key-here',
  baseUrl: 'https://api.autosend.com/v1' // optional, defaults to this
});
```

### Send Single Email

```typescript
// Basic email
await client.sendEmail({
  to: { email: 'user@example.com', name: 'User Name' },
  from: { email: 'noreply@yourapp.com', name: 'Your App' },
  subject: 'Welcome!',
  html: '<p>Welcome to our service!</p>'
});

// With template
await client.sendEmail({
  to: { email: 'user@example.com' },
  from: { email: 'noreply@yourapp.com' },
  templateId: 'welcome-template',
  dynamicData: {
    userName: 'John',
    activationLink: 'https://yourapp.com/activate'
  }
});

// With additional options
await client.sendEmail({
  to: { email: 'user@example.com', name: 'User' },
  from: { email: 'noreply@yourapp.com', name: 'Your App' },
  subject: 'Newsletter',
  html: '<p>Check out our latest updates!</p>',
  text: 'Check out our latest updates!', // plain text version
  replyTo: { email: 'support@yourapp.com', name: 'Support' },
  unsubscribeGroupId: 'newsletter-group'
});
```

### Send Bulk Emails

```typescript
await client.sendBulkEmail({
  recipients: [
    { email: 'user1@example.com', name: 'User 1' },
    { email: 'user2@example.com', name: 'User 2' },
    { email: 'user3@example.com', name: 'User 3' }
  ],
  from: { email: 'noreply@yourapp.com', name: 'Your App' },
  subject: 'Important Update',
  html: '<p>We have an important update for you!</p>',
  templateId: 'bulk-template', // optional
  dynamicData: { // optional, same data for all recipients
    companyName: 'Your Company'
  }
});

// Returns:
// {
//   batchId: '...',
//   totalRecipients: 3,
//   successCount: 3,
//   failedCount: 0
// }
```

### Manage Contacts

#### Create Contact

```typescript
await client.createContact({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  userId: 'user-123', // optional, your internal user ID
  customFields: { // optional
    plan: 'premium',
    signupDate: '2024-01-01'
  }
});
```

#### Upsert Contact

Create a new contact or update if email already exists:

```typescript
await client.upsertContact({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  customFields: {
    lastLogin: '2024-11-09'
  }
});
```

#### Remove Contacts

```typescript
await client.removeContacts({
  emails: ['user1@example.com', 'user2@example.com']
});

// Returns: { success: true }
```

## Error Handling

All methods throw `AutoSendError` on failure:

```typescript
import { AutoSendClient, AutoSendError } from 'autosend-sdk';

const client = new AutoSendClient({ apikey: 'your-key' });

try {
  await client.sendEmail({
    to: { email: 'user@example.com' },
    from: { email: 'sender@example.com' },
    subject: 'Test',
    html: '<p>Test</p>'
  });
} catch (error) {
  if (error instanceof AutoSendError) {
    console.error('AutoSend Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Response:', error.response);
  }
}
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions:

```typescript
import {
  AutoSendClient,
  SendEmailParams,
  SendEmailResponse,
  CreateContactParams,
  Contact,
  AutoSendError
} from 'autosend-sdk';
```

## API Reference

### `AutoSendClient`

#### Constructor Options
- `apikey` (required): Your AutoSend API key
- `baseUrl` (optional): API base URL, defaults to `https://api.autosend.com/v1`

#### Methods

- **`sendEmail(params: SendEmailParams): Promise<SendEmailResponse>`**
  - Send a single email
  
- **`sendBulkEmail(params: SendBulkEmailParams): Promise<SendBulkEmailResponse>`**
  - Send emails to multiple recipients
  
- **`createContact(params: CreateContactParams): Promise<CreateContactResponse>`**
  - Create a new contact
  
- **`upsertContact(params: CreateContactParams): Promise<CreateContactResponse>`**
  - Create or update a contact by email
  
- **`removeContacts(params: RemoveContactsParams): Promise<RemoveContactsResponse>`**
  - Remove contacts by email addresses

## License

MIT

## Author

Sahil Khan

## Repository

[GitHub](https://github.com/Itxsahil/autosend)
