import * as SQLite from "expo-sqlite";

import { UserPicture } from "@/api/treest/types";

import { ConsoleLogger } from "./Logger";

const queries = {
  CREATE_TABLE:
    "CREATE TABLE IF NOT EXISTS `user_picture` (`uid` TEXT NOT NULL, `pversion` TEXT NOT NULL, `picture` TEXT NOT NULL, PRIMARY KEY (`uid`, `pversion`));",
  FIND: "SELECT * FROM `user_picture` WHERE `uid` LIKE ? AND `pversion` LIKE ? LIMIT 1;",
  INSERT:
    "INSERT OR REPLACE INTO `user_picture` (`uid`,`pversion`,`picture`) VALUES (?,?,?);",
  SELECT_ALL: "SELECT * FROM `user_picture`",
};

const logger = new ConsoleLogger({ tag: "Storage" });

export const db = SQLite.openDatabase("treest");

db.transaction((tx) => {
  tx.executeSql(
    queries.CREATE_TABLE,
    [],
    (a, result) => logger.log(result),
    (a, error) => {
      logger.error(error);
      return false;
    }
  );
  logger.log("`user_picture` created.");
});

const transactionPromise = (sql: string, args?: (number | string | null)[]) => {
  return new Promise<unknown[]>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        args || [],
        (_, result) => {
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
          return true; // Rollback
        }
      );
    });
  });
};

export const getAllRows = async () => {
  return await transactionPromise(queries.SELECT_ALL);
};

export const insertPicture = async (input: UserPicture) => {
  return await transactionPromise(queries.INSERT, [
    input.userId,
    input.pversion,
    input.picture,
  ]);
};

export const loadPicture = async (input: Omit<UserPicture, "picture">) => {
  const result = await transactionPromise(queries.FIND, [
    input.userId,
    input.pversion,
  ]);

  if (result.length > 0) {
    return (result[0] as UserPicture).picture;
  } else {
    return null;
  }
};
