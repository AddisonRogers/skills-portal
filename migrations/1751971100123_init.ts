import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    // User Table
    await db.schema
        .createTable('user')
        .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('email', 'text', (col) => col.notNull().unique())
        .addColumn('email_verified', 'boolean', (col) => col.notNull())
        .addColumn('image', 'text')
        .addColumn('created_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .execute()

    // Session Table
    await db.schema
        .createTable('session')
        .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
        .addColumn('expires_at', 'timestamp', (col) => col.notNull())
        .addColumn('token', 'text', (col) => col.notNull().unique())
        .addColumn('created_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn('ip_address', 'text')
        .addColumn('user_agent', 'text')
        .addColumn('user_id', 'varchar(255)', (col) =>
            col.references('user.id').onDelete('cascade').notNull()
        )
        .execute()

    // Account Table
    await db.schema
        .createTable('account')
        .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
        .addColumn('account_id', 'text', (col) => col.notNull())
        .addColumn('provider_id', 'text', (col) => col.notNull())
        .addColumn('user_id', 'varchar(255)', (col) =>
            col.references('user.id').onDelete('cascade').notNull()
        )
        .addColumn('access_token', 'text')
        .addColumn('refresh_token', 'text')
        .addColumn('id_token', 'text')
        .addColumn('access_token_expires_at', 'timestamp')
        .addColumn('refresh_token_expires_at', 'timestamp')
        .addColumn('scope', 'text')
        .addColumn('password', 'text')
        .addColumn('created_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .execute()

    // Verification Table
    await db.schema
        .createTable('verification')
        .addColumn('id', 'varchar(255)', (col) => col.primaryKey())
        .addColumn('identifier', 'text', (col) => col.notNull())
        .addColumn('value', 'text', (col) => col.notNull())
        .addColumn('expires_at', 'timestamp', (col) => col.notNull())
        .addColumn('created_at', 'timestamp')
        .addColumn('updated_at', 'timestamp')
        .execute()

    // Skill Table
    await db.schema
        .createTable('skill')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull().unique())
        .addColumn('description', 'text')
        .addColumn('created_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .execute()

    // UserSkill Table
    await db.schema
        .createTable('user_skill')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('user_id', 'varchar(255)', (col) =>
            col.references('user.id').onDelete('cascade').notNull()
        )
        .addColumn('skill_id', 'integer', (col) =>
            col.references('skill.id').onDelete('cascade').notNull()
        )
        .addColumn('acquired_at', 'timestamp')
        .addColumn('level', 'integer')
        .execute()

    // Certification Table
    await db.schema
        .createTable('certification')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('issuer', 'text')
        .execute()

    // UserCertification Table
    await db.schema
        .createTable('user_certification')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('user_id', 'varchar(255)', (col) =>
            col.references('user.id').onDelete('cascade').notNull()
        )
        .addColumn('cert_id', 'integer', (col) =>
            col.references('certification.id').onDelete('cascade').notNull()
        )
        .addColumn('issued_at', 'timestamp')
        .addColumn('expires_at', 'timestamp')
        .execute()

    // Role Table
    await db.schema
        .createTable('role')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .execute()

    // Client Table
    await db.schema
        .createTable('client')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .execute()

    // Project Table
    await db.schema
        .createTable('project')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .addColumn('started_at', 'timestamp')
        .addColumn('ended_at', 'timestamp')
        .execute()

    // ClientProject Table
    await db.schema
        .createTable('client_project')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('client_id', 'integer', (col) =>
            col.references('client.id').onDelete('cascade').notNull()
        )
        .addColumn('project_id', 'integer', (col) =>
            col.references('project.id').onDelete('cascade').notNull()
        )
        .execute()

    // ProjectUser Table
    await db.schema
        .createTable('project_user')
        .addColumn('id', 'serial', (col) => col.primaryKey())
        .addColumn('project_id', 'integer', (col) =>
            col.references('project.id').onDelete('cascade').notNull()
        )
        .addColumn('user_id', 'varchar(255)', (col) =>
            col.references('user.id').onDelete('cascade').notNull()
        )
        .addColumn('role_id', 'integer', (col) =>
            col.references('role.id').onDelete('cascade').notNull()
        )
        .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('project_user').execute()
    await db.schema.dropTable('client_project').execute()
    await db.schema.dropTable('project').execute()
    await db.schema.dropTable('client').execute()
    await db.schema.dropTable('role').execute()
    await db.schema.dropTable('user_certification').execute()
    await db.schema.dropTable('certification').execute()
    await db.schema.dropTable('user_skill').execute()
    await db.schema.dropTable('skill').execute()
    await db.schema.dropTable('verification').execute()
    await db.schema.dropTable('account').execute()
    await db.schema.dropTable('session').execute()
    await db.schema.dropTable('user').execute()
}