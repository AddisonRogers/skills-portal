import type {Generated, Insertable, Selectable, Updateable} from "kysely";

export interface UserTable {
    id: Generated<string>
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UpdateUser = Updateable<UserTable>

export interface SessionTable {
    id: Generated<string>
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string // FK -> User.id
}

export type Session = Selectable<SessionTable>
export type NewSession = Insertable<SessionTable>
export type UpdateSession = Updateable<SessionTable>

export interface AccountTable {
    id: Generated<string>
    accountId: string
    providerId: string
    userId: string // FK -> User.id
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
}

export type Account = Selectable<AccountTable>
export type NewAccount = Insertable<AccountTable>
export type UpdateAccount = Updateable<AccountTable>

export interface VerificationTable {
    id: Generated<string>
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
}

export type Verification = Selectable<VerificationTable>
export type NewVerification = Insertable<VerificationTable>
export type UpdateVerification = Updateable<VerificationTable>

export interface SkillTable {
    id: Generated<number>
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
}

export type Skill = Selectable<SkillTable>
export type NewSkill = Insertable<SkillTable>
export type UpdateSkill = Updateable<SkillTable>

export interface UserSkillTable {
    id: Generated<number>
    userId: string // FK -> User.id
    skillId: string // FK -> Skill.id
    acquiredAt: Date | null
    level: number | null
}

export type UserSkill = Selectable<UserSkillTable>
export type NewUserSkill = Insertable<UserSkillTable>
export type UpdateUserSkill = Updateable<UserSkillTable>

export interface CertificationTable {
    id: Generated<number>
    name: string
    issuer: string | null
}

export type Certification = Selectable<CertificationTable>
export type NewCertification = Insertable<CertificationTable>
export type UpdateCertification = Updateable<CertificationTable>

export interface UserCertificationTable {
    id: Generated<number>
    userId: string // FK -> User.id
    certId: string // FK -> Certification.id
    issuedAt: Date | null
    expiresAt: Date | null
}

export type UserCertification = Selectable<UserCertificationTable>
export type NewUserCertification = Insertable<UserCertificationTable>
export type UpdateUserCertification = Updateable<UserCertificationTable>

export interface RoleTable {
    id: Generated<number>
    name: string
    description: string | null
}

export type Role = Selectable<RoleTable>
export type NewRole = Insertable<RoleTable>
export type UpdateRole = Updateable<RoleTable>

export interface ClientTable {
    id: Generated<number>
    name: string
    description: string | null
}

export type Client = Selectable<ClientTable>
export type NewClient = Insertable<ClientTable>
export type UpdateClient = Updateable<ClientTable>

export interface ClientProjectTable {
    id: Generated<number>
    clientId: string // FK -> Client.id
    projectId: string // FK -> Project.id
}

export type ClientProject = Selectable<ClientProjectTable>
export type NewClientProject = Insertable<ClientProjectTable>
export type UpdateClientProject = Updateable<ClientProjectTable>

export interface ProjectTable {
    id: Generated<number>
    name: string
    description: string | null
    startedAt: Date | null
    endedAt: Date | null
}

export type Project = Selectable<ProjectTable>
export type NewProject = Insertable<ProjectTable>
export type UpdateProject = Updateable<ProjectTable>

export interface ProjectUserTable {
    id: Generated<number>
    projectId: string // FK -> Project.id
    userId: string // FK -> User.id
    roleId: string // FK -> Role.id
}

export type ProjectUser = Selectable<ProjectUserTable>
export type NewProjectUser = Insertable<ProjectUserTable>
export type UpdateProjectUser = Updateable<ProjectUserTable>

// The main Kysely Database interface
export interface Database {
    user: UserTable
    session: SessionTable
    account: AccountTable
    verification: VerificationTable
    skill: SkillTable
    user_skill: UserSkillTable
    certification: CertificationTable
    user_certification: UserCertificationTable
    role: RoleTable
    client: ClientTable
    client_project: ClientProjectTable
    project: ProjectTable
    project_user: ProjectUserTable
}