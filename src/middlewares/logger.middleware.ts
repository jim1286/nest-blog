import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment-timezone';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 요청 객체로부터 ip, http method, url, user agent를 받아온 후
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');
    const dateTime = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');

    // 응답이 끝나는 이벤트가 발생하면 로그를 찍는다.
    res.on('finish', () => {
      const { statusCode } = res;

      if (statusCode < 300) {
        this.logger.log(
          `${dateTime} - ${method} ${originalUrl} ${statusCode} ${ip} ${userAgent}`,
        );
      }
    });

    next();
  }
}
