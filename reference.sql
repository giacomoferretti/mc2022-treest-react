CREATE TABLE `user_picture` (
  `uid` TEXT NOT NULL,
  `pversion` TEXT NOT NULL,
  `picture` TEXT NOT NULL,
  PRIMARY KEY (`uid`, `pversion`)
);
