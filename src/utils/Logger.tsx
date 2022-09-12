// import { LOG_LEVEL } from "./environment";
import { Platform } from "react-native";

/** Signature of a logging function */
export interface LogFn {
  (message?: any, ...optionalParams: any[]): void;
}

/** Basic logger interface */
export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
}

/** Log levels */
export type LogLevel = "log" | "warn" | "error";

const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => {};

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: { level?: LogLevel }) {
    const { level } = options || {};

    this.error = console.error.bind(
      console,
      `[${Platform.OS.substring(0, 3)}]`
    );

    if (level === "error") {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console, `[${Platform.OS.substring(0, 3)}]`);

    if (level === "warn") {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console, `[${Platform.OS.substring(0, 3)}]`);
  }
}

export const logger = new ConsoleLogger({ level: "log" });
