import {boolean, integer, pgTable, serial, text, timestamp, uuid, varchar} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = pgTable("session", {
  id: serial().primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: integer('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: serial().primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: integer('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
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
  id: serial().primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});


export const skill = pgTable("skill", {
  id: serial().primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => new Date()).notNull(),
});

export const userSkill = pgTable("user_skill", {
  id: serial().primaryKey(),
  userId: integer('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  skillId: integer('skill_id').notNull().references(() => skill.id, { onDelete: 'cascade' }),
  acquiredAt: timestamp('acquired_at'),
  level: integer('level'),
});

export const certification = pgTable("certification", {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  issuer: text('issuer'),
});

export const userCertification = pgTable("user_certification", {
  id: serial().primaryKey(),
  userId: integer('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  certId: integer('cert_id').notNull().references(() => certification.id, { onDelete: 'cascade' }),
  issuedAt: timestamp('issued_at'),
  expiresAt: timestamp('expires_at'),
});

export const role = pgTable("role", {
  id: serial().primaryKey(),
  name: text('name'),
  description: text('description'),
});

export const user_roles = pgTable("user_role", {
  id: serial().primaryKey(),
  userId: integer('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  roleId: integer('role_id').notNull().references(() => role.id, { onDelete: 'cascade' }),
})

export const client = pgTable("client", {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
});

export const project = pgTable("project", {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
});

export const clientProject = pgTable("client_project", {
  id: serial().primaryKey(),
  clientId: integer('client_id').notNull().references(() => client.id, { onDelete: 'cascade' }),
  projectId: integer('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }),
});

export const projectUser = pgTable("project_user", {
  id: serial().primaryKey(),
  projectId: integer('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  roleId: integer('role_id').references(() => role.id, { onDelete: 'set null' }),
});



