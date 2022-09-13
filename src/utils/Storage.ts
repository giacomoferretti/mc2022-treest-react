import * as SQLite from "expo-sqlite";

import { UserPicture } from "@/api/treest/types";

import { ConsoleLogger } from "./Logger";

const queries = {
  DROP_TABLE: "DROP TABLE`user_picture`;",
  CREATE_TABLE:
    "CREATE TABLE IF NOT EXISTS `user_picture` (`uid` TEXT NOT NULL, `pversion` TEXT NOT NULL, `picture` TEXT, PRIMARY KEY (`uid`, `pversion`));",
  FIND: "SELECT * FROM `user_picture` WHERE `uid` LIKE ? AND `pversion` LIKE ? LIMIT 1;",
  INSERT:
    "INSERT OR REPLACE INTO `user_picture` (`uid`,`pversion`,`picture`) VALUES (?,?,?);",
  SELECT_ALL: "SELECT * FROM `user_picture`",
};

const logger = new ConsoleLogger({ tag: "Storage" });

export const db = SQLite.openDatabase("treest");

// db.transaction((tx) => {
//   tx.executeSql(queries.DROP_TABLE);
//   logger.log("`user_picture` deleted.");
// });

db.transaction((tx) => {
  tx.executeSql(queries.CREATE_TABLE);
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
    input.uid,
    input.pversion,
    input.picture,
  ]);
};

export const loadPicture = async (input: Omit<UserPicture, "picture">) => {
  const result = await transactionPromise(queries.FIND, [
    input.uid,
    input.pversion,
  ]);

  if (result.length !== 0) {
    return (result[0] as UserPicture).picture;
  } else {
    return null;
  }
};

export const hasPicture = async (input: Omit<UserPicture, "picture">) => {
  const result = await transactionPromise(queries.FIND, [
    input.uid,
    input.pversion,
  ]);

  return result.length > 0;
};

// getAllRows().then((result) => logger.log(result));
