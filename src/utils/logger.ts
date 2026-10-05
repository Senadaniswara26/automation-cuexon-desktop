type LogLevel = "info" | "warn" | "error";

function write(level: LogLevel, message: string): void {
  const timestamp = new Date().toISOString();
  const output = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  if (level === "error") {
    console.error(output);
  } else if (level === "warn") {
    console.warn(output);
  } else {
    console.info(output);
  }
}

export const logger = {
  info: (message: string) => write("info", message),
  warn: (message: string) => write("warn", message),
  error: (message: string) => write("error", message),
};
