export interface IData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data?: T;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
