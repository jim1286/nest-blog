import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment-timezone';

interface ErrorResponse {
  error: string;
  statusCode: number;
  message: string | string[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const userAgent = req.get('user-agent');
    const status = exception.getStatus();
    const error = exception.getResponse() as ErrorResponse;
    const dateTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    const { ip, method, originalUrl } = req;

    this.logger.error(
      `${dateTime} - ${method} ${originalUrl} ${status} message:${error.message}  ${ip} ${userAgent}`,
    );

    res.status(status).json({
      statusCode: status,
      timestamp: dateTime,
      path: originalUrl,
      error,
    });
  }
}
