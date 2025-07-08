import {
    DummyDriver,
    PostgresAdapter,
    PostgresIntrospector,
    PostgresQueryCompiler,
} from 'kysely'
import {defineConfig} from 'kysely-ctl'
import {MssqlDialect} from "kysely";
import * as Tarn from "tarn";
import * as Tedious from "tedious";

export default defineConfig({
    // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
    dialect: new MssqlDialect({
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
    }),
    migrations: {
        migrationFolder: "migrations",
    },
    //   plugins: [],
    //   seeds: {
    //     seedFolder: "seeds",
    //   }
})
