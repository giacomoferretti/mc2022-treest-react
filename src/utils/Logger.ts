import { Platform } from "react-native";

export interface LogFn {
  (message?: unknown, ...optionalParams: unknown[]): void;
}

export interface Logger {
  log: LogFn;
  warn: LogFn;
  error: LogFn;
}

export type LogLevel = "log" | "warn" | "error";

const NO_OP: LogFn = () => undefined;

export class ConsoleLogger implements Logger {
  readonly log: LogFn;
  readonly warn: LogFn;
  readonly error: LogFn;

  constructor(options?: { tag: string; level?: LogLevel }) {
    const { tag, level } = options || { tag: "App", level: "log" };

    const prefix = `[${Platform.OS.substring(0, 3)}/${tag
      .substring(0, 15)
      .padStart(15)}]`;

    this.error = console.error.bind(console, prefix);

    if (level === "error") {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console, prefix);

    if (level === "warn") {
      this.log = NO_OP;

      return;
    }

    this.log = console.log.bind(console, prefix);
  }
}

export const logger = new ConsoleLogger();
