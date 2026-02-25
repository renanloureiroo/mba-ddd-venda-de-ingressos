/**
 * Interface mínima que o serviço transacional deve implementar.
 * Definida aqui em `common` para evitar dependência circular com `infra`.
 */
interface ITransactionalService {
  runInTransaction<T>(fn: () => Promise<T>): Promise<T>
}

type InstanceWithConstructor = {
  constructor?: { name?: string }
}

/**
 * Envolve automaticamente o método decorado em uma transação do banco de dados.
 *
 * Requisito: a classe ou alguma de suas dependências injetadas no constructor
 * deve expor um método `runInTransaction()` (ex: `DrizzleService`).
 *
 * Exemplo:
 * ```ts
 * @Transactional()
 * async execute(input: CreateEventInput) {
 *   // tudo aqui roda na mesma transaction — sem nenhum boilerplate
 * }
 * ```
 */
export function Transactional(): MethodDecorator {
  return (_target, _key, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as (
      this: Record<string, unknown>,
      ...args: unknown[]
    ) => Promise<unknown>

    descriptor.value = async function (
      this: Record<string, unknown>,
      ...args: unknown[]
    ) {
      const service = findTransactionalService(this)

      if (!service) {
        const name =
          (this as InstanceWithConstructor).constructor?.name ?? 'desconhecido'
        throw new Error(
          `@Transactional(): nenhum serviço com runInTransaction() encontrado em "${name}". ` +
            `Certifique-se que a classe ou uma de suas dependências implementa runInTransaction().`,
        )
      }

      const boundMethod: () => Promise<unknown> = () =>
        originalMethod.call(this, ...args) as Promise<unknown>
      return service.runInTransaction(boundMethod)
    }

    return descriptor
  }
}

/**
 * Busca duck-typing por qualquer objeto com `runInTransaction()`.
 * Varre a própria instância e 1 nível de profundidade nas dependências.
 * Desta forma, não há acoplamento com nenhuma classe concreta de infra.
 */
function findTransactionalService(
  instance: object,
): ITransactionalService | null {
  if (hasRunInTransaction(instance)) return instance

  for (const value of Object.values(instance)) {
    if (hasRunInTransaction(value)) return value

    // 1 nível abaixo (repositório → DrizzleService, por exemplo)
    if (value && typeof value === 'object') {
      for (const nested of Object.values(value as object)) {
        if (hasRunInTransaction(nested)) return nested
      }
    }
  }

  return null
}

function hasRunInTransaction(value: unknown): value is ITransactionalService {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Record<string, unknown>)['runInTransaction'] === 'function'
  )
}
