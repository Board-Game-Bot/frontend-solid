export interface ResponseError {
  statusCode: number;
  message: Record<string, any>;
  error: string;
}
