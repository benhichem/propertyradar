import { DataSource } from "typeorm";
import { List } from "./lists.model";
const AppDatasource = new DataSource({
  type: "sqlite",
  database: "list.database",
  synchronize: true,
  logging: true,
  entities: [List]
}).initialize()



export { AppDatasource }

