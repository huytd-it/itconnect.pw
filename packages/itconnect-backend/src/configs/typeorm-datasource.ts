import {DataSource} from "typeorm";

const dataSource: DataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [
        "src/**/*.entity.ts"
    ],
    migrations: [
        "src/migrations/*.ts"
    ]
})

export default dataSource;