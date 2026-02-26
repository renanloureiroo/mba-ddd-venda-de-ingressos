export class CpfValidator {
  static validate(cpf: string): boolean {
    if (!cpf) return false

    const cleanCpf = cpf.replace(/\D/g, '')

    if (cleanCpf.length !== 11) {
      return false
    }

    const allDigitsEqual = /^(\d)\1{10}$/.test(cleanCpf)
    if (allDigitsEqual) {
      return false
    }

    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (10 - i)
    }
    let firstDigit = 11 - (sum % 11)
    if (firstDigit > 9) {
      firstDigit = 0
    }

    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCpf.charAt(i)) * (11 - i)
    }
    let secondDigit = 11 - (sum % 11)
    if (secondDigit > 9) {
      secondDigit = 0
    }

    return (
      firstDigit === parseInt(cleanCpf.charAt(9)) &&
      secondDigit === parseInt(cleanCpf.charAt(10))
    )
  }
}
