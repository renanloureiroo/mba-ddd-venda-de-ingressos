import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { CpfValidator } from '../../../common/domain/validators/cpf.validator'

@ValidatorConstraint({ async: false })
export class IsCpfConstraint implements ValidatorConstraintInterface {
  validate(cpf: string) {
    return typeof cpf === 'string' && CpfValidator.validate(cpf)
  }

  defaultMessage() {
    return 'CPF inválido'
  }
}

export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfConstraint,
    })
  }
}
