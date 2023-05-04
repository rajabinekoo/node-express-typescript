import { databaseConnection } from "./connection";

export const initDatabase = async () => {
  try {
    await databaseConnection.initialize();
    console.log("[+] Database connected.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
