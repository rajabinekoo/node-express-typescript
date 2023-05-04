import { DataSource } from "typeorm";
import {
  databaseLogging,
  databaseName,
  databasePassword,
  databaseSync,
  databaseUsername,
} from "../configs";

export const databaseConnection = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: databaseUsername,
  password: databasePassword,
  database: databaseName,
  entities: ["database/entities/*.entity.ts"],
  logging: databaseLogging,
  synchronize: databaseSync,
});
