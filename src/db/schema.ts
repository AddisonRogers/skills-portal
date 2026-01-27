import {
	boolean,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	unique,
	uniqueIndex,
	foreignKey,
} from "drizzle-orm/pg-core";

export const user = pgTable(
	"user",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		emailVerified: boolean("email_verified")
			.$defaultFn(() => false)
			.notNull(),
		locationId: integer("location_id").references(() => location.id, {
			onDelete: "set null",
		}),
		reportsToUserId: text("reports_to_user_id"),
		jobRoleId: integer("job_role_id").references(() => jobRole.id, {
			onDelete: "set null",
		}),
		image: text("image"),
		createdAt: timestamp("created_at")
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),
		updatedAt: timestamp("updated_at")
			.$defaultFn(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(t) => ({
		reportsToFk: foreignKey({
			columns: [t.reportsToUserId],
			foreignColumns: [t.id],
		}).onDelete("set null"),
	}),
);

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
	updatedAt: timestamp("updated_at").$defaultFn(
		() => /* @__PURE__ */ new Date(),
	),
});

export const skill = pgTable("skill", {
	id: serial().primaryKey(),
	name: text("name").notNull().unique(),
	machineName: text("machine_name"),
	blobUrl: text("blob_url"),
	description: text("description"),
	bigSkill: boolean("big_skill").default(false).notNull(),
	xpAmount: integer("xp_level").default(0).notNull(),
	madeBy: text("made_by").default("roadmap.sh"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userSkill = pgTable(
	"user_skill",
	{
		id: serial().primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		skillId: integer("skill_id")
			.notNull()
			.references(() => skill.id, { onDelete: "cascade" }),
		acquiredAt: timestamp("acquired_at"),
		level: integer("level"),
	},
	(table) => ({
		// Add unique constraint on userId and skillId combination
		uniqueUserSkill: unique().on(table.userId, table.skillId),
	}),
);

export const certification = pgTable("certification", {
	id: serial().primaryKey(),
	name: text("name").notNull(),
	issuer: text("issuer"),
});

export const userCertification = pgTable("user_certification", {
	id: serial().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	certId: integer("cert_id")
		.notNull()
		.references(() => certification.id, { onDelete: "cascade" }),
	issuedAt: timestamp("issued_at"),
	expiresAt: timestamp("expires_at"),
});

export const accessRole = pgTable("access_role", {
	id: serial().primaryKey(),
	name: text("name"),
	description: text("description"),
});

export const userRoles = pgTable("user_role", {
	id: serial().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	roleId: integer("role_id")
		.notNull()
		.references(() => accessRole.id, { onDelete: "cascade" }),
});

export const client = pgTable("client", {
	id: serial().primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
});

export const project = pgTable("project", {
	id: serial().primaryKey(),
	clientId: integer("client_id")
		.notNull()
		.references(() => client.id, { onDelete: "restrict" }),
	name: text("name").notNull(),
	description: text("description"),
	status: text("status").notNull().default("active"),
	startedAt: timestamp("started_at"),
	endedAt: timestamp("ended_at"),
});

export const projectRole = pgTable("project_role", {
	id: serial().primaryKey(),
	name: text("name").notNull().unique(),
	description: text("description"),
});

export const projectUser = pgTable(
	"project_user",
	{
		id: serial().primaryKey(),
		projectId: integer("project_id")
			.notNull()
			.references(() => project.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		projectRoleId: integer("project_role_id").references(() => projectRole.id, {
			onDelete: "set null",
		}),
	},
	(t) => ({
		uqProjectUser: uniqueIndex("uq_project_user").on(t.projectId, t.userId),
	}),
);

export const projectUserSkill = pgTable(
	"project_user_skill",
	{
		id: serial().primaryKey(),
		projectUserId: integer("project_user_id")
			.notNull()
			.references(() => projectUser.id, { onDelete: "cascade" }),
		skillId: integer("skill_id")
			.notNull()
			.references(() => skill.id, { onDelete: "cascade" }),
	},
	(t) => ({
		uqProjectUserSkill: uniqueIndex("uq_project_user_skill").on(
			t.projectUserId,
			t.skillId,
		),
	}),
);

export const roadmap = pgTable("roadmap", {
	id: text("id").primaryKey(),
	name: text("name").notNull().unique(),
	description: text("description"),
	relatedRoadmaps: text("related_roadmaps"),
	viewable: boolean("viewable").default(false).notNull(),
	createdBy: text("created_by").default("roadmap.sh").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const skillRoadmap = pgTable("skill_roadmap", {
	id: serial().primaryKey(),
	skillId: integer("skill_id")
		.notNull()
		.references(() => skill.id, { onDelete: "cascade" }),
	roadmapId: text("roadmap_id").notNull(),
	viewable: boolean("viewable").default(false).notNull(),
	createdBy: text("created_by").default("roadmap.sh").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userFavoriteRoadmap = pgTable("user_favorite_roadmap", {
	id: serial().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	roadmapId: text("roadmap_id").notNull(),
});

export const userFavoriteSkill = pgTable("user_favorite_skill", {
	id: serial().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	skillId: integer("skill_id")
		.notNull()
		.references(() => skill.id, { onDelete: "cascade" }),
});

export const suggestedRoadmap = pgTable("suggested_roadmap", {
	id: serial().primaryKey(),
	fromUserId: text("from_user_id") // Who suggested
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	toUserId: text("to_user_id") // Who received the suggestion
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	roadmapId: text("roadmap_id").notNull(),
	message: text("message"), // Optional custom message
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const capabilities = pgTable("capabilities", {
	id: serial().primaryKey(),
	name: text("name").notNull().unique(),
	description: text("description"),
});

export const capabilityRoadmap = pgTable("capability_roadmap", {
	id: serial().primaryKey(),
	capabilityId: integer("capability_id")
		.notNull()
		.references(() => capabilities.id, { onDelete: "cascade" }),
	roadmapId: text("roadmap_id").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const capabilityUser = pgTable("capability_user", {
	id: serial().primaryKey(),
	capabilityId: integer("capability_id")
		.notNull()
		.references(() => capabilities.id, { onDelete: "cascade" }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const location = pgTable("location", {
	id: serial().primaryKey(),
	name: text("name").notNull().unique(),
});

export const jobRole = pgTable("job_role", {
	id: serial().primaryKey(),
	title: text("title").notNull().unique(),
	description: text("description"),
});
