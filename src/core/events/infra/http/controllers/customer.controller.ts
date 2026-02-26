import { RegisterCustomerInputDTO } from '@/core/events/application/dtos/register-customer-input.dto'
import { CustomerService } from '@/core/events/application/services/customer.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async list() {
    return this.customerService.list()
  }

  @Post()
  async register(@Body() input: RegisterCustomerInputDTO) {
    return this.customerService.register(input)
  }
}
