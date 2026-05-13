export interface LogContext {
  method?: string;
  url?: string;
  userId?: string;
  requestId?: string;
  timestamp?: string;
  statusCode?: number;
  duration?: number;
  [key: string]: unknown;
}

export interface LogEntry {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
    type?: string;
  };
  timestamp: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private formatLog(entry: LogEntry): string {
    const { level, message, context, error, timestamp } = entry;
    const contextStr = context ? JSON.stringify(context) : '';
    const errorStr = error ? JSON.stringify(error) : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${contextStr} ${errorStr}`.trim();
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorObj =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            // stack: this.isDevelopment ? error.stack : undefined,
            code: (error as any).code,
            type: (error as any).type,
          }
        : undefined;

    const entry: LogEntry = {
      level: 'error',
      message,
      error: errorObj,
      context,
      timestamp: this.formatTimestamp(),
    };

    console.error(this.formatLog(entry));
  }

  warn(message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level: 'warn',
      message,
      context,
      timestamp: this.formatTimestamp(),
    };

    console.warn(this.formatLog(entry));
  }

  info(message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level: 'info',
      message,
      context,
      timestamp: this.formatTimestamp(),
    };

    if (this.isDevelopment) {
      console.info(this.formatLog(entry));
    }
  }

  debug(message: string, context?: LogContext): void {
    const entry: LogEntry = {
      level: 'debug',
      message,
      context,
      timestamp: this.formatTimestamp(),
    };

    if (this.isDevelopment) {
      console.debug(this.formatLog(entry));
    }
  }
}

export const logger = new Logger();
