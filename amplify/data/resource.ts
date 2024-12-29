import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Waitlist: a
    .model({
      username: a.string(),
      email: a.email(),
      sector: a.string(),
      passrequested: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
