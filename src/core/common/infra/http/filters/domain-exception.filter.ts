import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { DomainError } from '@/core/common/application/domain.error'

const errorMap: Record<string, HttpStatus> = {
  InvalidCpfError: HttpStatus.BAD_REQUEST,
  CustomerAlreadyExistsError: HttpStatus.CONFLICT,
  PartnerNotFoundError: HttpStatus.NOT_FOUND,
  EventNotFoundError: HttpStatus.NOT_FOUND,
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message: string | string[] = 'Internal server error'

    if (exception instanceof DomainError) {
      status = errorMap[exception.name] || HttpStatus.UNPROCESSABLE_ENTITY
      message = exception.message
      this.logger.warn(`[${exception.constructor.name}] ${exception.message}`)
    } else if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        message = (exceptionResponse as Record<string, unknown>).message as
          | string
          | string[]
      } else {
        message = exception.message
      }
      const msgString = Array.isArray(message) ? message.join(', ') : message
      this.logger.warn(`[${exception.constructor.name}] ${msgString}`)
    } else if (exception instanceof Error) {
      message = 'Internal server error'
      this.logger.error(
        `${exception.constructor.name}: ${exception.message}`,
        exception.stack,
      )
    } else {
      message = 'Internal server error'
      this.logger.error('UnhandledException', String(exception))
    }

    const payload: Record<string, unknown> = {
      statusCode: status,
      message,
    }

    response.status(status).json(payload)
  }
}
