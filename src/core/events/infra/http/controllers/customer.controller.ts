import { RegisterCustomerInputDTO } from '@/core/events/application/dtos/register-customer-input.dto'
import { CustomerService } from '@/core/events/application/services/customer.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CostumerItemListOutputDTO } from '../presenters/dtos/costumer-item-list-output.dto'
import { CustomerPresenter } from '../presenters/customer.presenter'
import { HttpErrorResponseDto } from '@/core/common/infra/http/swagger/http-error-response.dto'

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @ApiOkResponse({
    type: [CostumerItemListOutputDTO],
    description: 'Lista de clientes',
  })
  @Get()
  async list(): Promise<CostumerItemListOutputDTO[]> {
    const result = await this.customerService.list()
    return CustomerPresenter.toHttpList(result)
  }

  @ApiCreatedResponse({
    description: 'Cliente registrado',
  })
  @ApiBadRequestResponse({
    description: 'CPF inválido (ex: formato incorreto ou já existente na base)',
    type: HttpErrorResponseDto,
    example: {
      statusCode: 400,
      message: ['CPF inválido'],
    },
  })
  @ApiConflictResponse({
    description: 'Cliente já cadastrado na plataforma',
    type: HttpErrorResponseDto,
    example: {
      statusCode: 409,
      message: 'Cliente já cadastrado na plataforma',
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno do servidor',
    type: HttpErrorResponseDto,
    example: {
      statusCode: 500,
      message: 'Internal server error',
    },
  })
  @Post()
  async register(@Body() input: RegisterCustomerInputDTO) {
    return this.customerService.register(input)
  }
}
