import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    // Skill Table
    await db.schema
        .createTable('skill')
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('name', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('description', 'text')
        .addColumn('created_at', 'datetime', (col) =>
            col.notNull().defaultTo(sql`GETDATE()`)
        )
        .addColumn('updated_at', 'datetime', (col) =>
            col.notNull().defaultTo(sql`GETDATE()`)
        )
        .execute()

    // UserSkill Table
    await db.schema
        .createTable('user_skill')
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('user_id', 'varchar(36)', (col) =>
            col.references('user.id').onDelete('cascade').notNull()
        )
        .addColumn('skill_id', 'integer', (col) =>
            col.references('skill.id').onDelete('cascade').notNull()
        )
        .addColumn('acquired_at', 'datetime')
        .addColumn('level', 'integer')
        .execute()

    // Certification Table
    await db.schema
        .createTable('certification')
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('issuer', 'text')
        .execute()

    // UserCertification Table
    await db.schema
        .createTable('user_certification')
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('user_id', 'varchar(36)', (col) =>
            col.references('user.id').onDelete('cascade').notNull()
        )
        .addColumn('cert_id', 'integer', (col) =>
            col.references('certification.id').onDelete('cascade').notNull()
        )
        .addColumn('issued_at', 'datetime')
        .addColumn('expires_at', 'datetime')
        .execute()

    // Role Table
    await db.schema
        .createTable('role')
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .execute()

    // Client Table
    await db.schema
        .createTable('client')
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .execute()

    // Project Table
    await db.schema
        .createTable('project')
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('name', 'text', (col) => col.notNull())
        .addColumn('description', 'text')
        .addColumn('started_at', 'datetime')
        .addColumn('ended_at', 'datetime')
        .execute()

    // ClientProject Table
    await db.schema
        .createTable('client_project')
        .addColumn('id', 'integer', (col) => col.primaryKey())
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
        .addColumn('id', 'integer', (col) => col.primaryKey())
        .addColumn('project_id', 'integer', (col) =>
            col.references('project.id').onDelete('cascade').notNull()
        )
        .addColumn('user_id', 'varchar(36)', (col) =>
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