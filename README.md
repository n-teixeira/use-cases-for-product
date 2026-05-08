# FC Clean Architecture

Projeto base do curso Full Cycle com casos de uso da entidade **Product** (CRUD), DTOs de entrada/saída e testes de unidade e integração (SQLite em memória).

## Pré-requisitos

- Node.js (versão compatível com o `package.json` do projeto)
- npm

## Instalação

```bash
npm install
```

## Testes

Executa a checagem do TypeScript (`tsc --noEmit`) e em seguida todos os testes Jest:

```bash
npm test
```

### Apenas testes de produto (use cases)

```bash
npx jest product
```

### Apenas unidade ou integração (por sufixo)

```bash
npx jest product.unit
npx jest product.integration
```

### Um arquivo específico

```bash
npx jest src/usecase/product/create/create.product.unit.spec.ts
```

## Estrutura dos use cases (Product)

- `src/usecase/product/create` — criação
- `src/usecase/product/find` — busca por ID
- `src/usecase/product/list` — listagem
- `src/usecase/product/update` — atualização

Cada pasta contém DTOs, implementação do caso de uso, teste de unidade (mocks) e teste de integração (banco em memória).
