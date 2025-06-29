export default class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: string; // "fail" | "error"

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    // Maintains proper stack trace (only in V8—Node, Chrome)
    Error.captureStackTrace(this, this.constructor);
  }
}