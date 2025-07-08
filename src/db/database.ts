import {Kysely, MssqlDialect} from "kysely";
import * as Tarn from "tarn";
import * as Tedious from "tedious";
import type {Database} from "@/db/types";

export const dialect = new MssqlDialect({
    tarn: {
        ...Tarn,
        options: {
            min: 0,
            max: 10,
        },
    },
    tedious: {
        ...Tedious,
        connectionFactory: () => new Tedious.Connection({
            authentication: {
                type: 'azure-active-directory-default',
            },
            options: {
                database: process.env.AZSQL_DB as string,
                port: Number(process.env.AZSQL_PORT as string),
                trustServerCertificate: true,
            },
            server: process.env.AZSQL_SERVER as string,
        }),
    },
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
    dialect,
})