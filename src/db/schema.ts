import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});


export const skill = pgTable("skill", {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => new Date()).notNull(),
});

export const userSkill = pgTable("user_skill", {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  skillId: text('skill_id').notNull().references(() => skill.id, { onDelete: 'cascade' }),
  acquiredAt: timestamp('acquired_at'),
  level: integer('level'),
});

export const certification = pgTable("certification", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  issuer: text('issuer'),
});

export const userCertification = pgTable("user_certification", {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  certId: text('cert_id').notNull().references(() => certification.id, { onDelete: 'cascade' }),
  issuedAt: timestamp('issued_at'),
  expiresAt: timestamp('expires_at'),
});

export const role = pgTable("role", {
  id: text('id').primaryKey(),
  name: text('name'),
  description: text('description'),
});

export const client = pgTable("client", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
});

export const project = pgTable("project", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
});

export const clientProject = pgTable("client_project", {
  id: text('id').primaryKey(),
  clientId: text('client_id').notNull().references(() => client.id, { onDelete: 'cascade' }),
  projectId: text('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }),
});

export const projectUser = pgTable("project_user", {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  roleId: text('role_id').references(() => role.id, { onDelete: 'set null' }),
});



