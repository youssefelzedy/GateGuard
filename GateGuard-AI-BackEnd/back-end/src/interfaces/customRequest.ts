import { Request } from 'express';
interface customRequest extends Request {
  originalUrl: string;
}

export default customRequest;
