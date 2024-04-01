import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment-timezone';
import * as winstonDaily from 'winston-daily-rotate-file';

const isProduction = process.env.NODE_ENV === 'production';
const logDir = __dirname + '/../../../logs'; // log 파일을 관리할 폴더

const appendTimestamp = winston.format((info, opts) => {
  if (opts.tz) {
    info.timestamp = moment().tz(opts.tz).format();
  }
  return info;
});

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, //30일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  };
};

export const WinstonLoggerConfig = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: isProduction ? 'info' : 'silly',
      format: isProduction
        ? winston.format.simple()
        : winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('nest-blog', {
              colors: true,
              prettyPrint: true,
            }),
          ),
    }),
    new winstonDaily(dailyOptions('info')),
    new winstonDaily(dailyOptions('warn')),
    new winstonDaily(dailyOptions('error')),
  ],
  format: winston.format.combine(
    appendTimestamp({ tz: 'Asia/Seoul' }),
    winston.format.json(),
    winston.format.printf(
      (info) =>
        `${info.timestamp} - ${info.level} [${process.pid}: ${info.message}]`,
    ),
  ),
});
