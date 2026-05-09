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

## Entidade Product e Notification Pattern

A validação da entidade `Product` (e `ProductB`) usa o `Notification` do domínio compartilhado: os erros são acumulados e, se houver inconsistências, é lançado `NotificationError` (com todas as mensagens). Os testes cobrem o caso obrigatório de **múltiplos erros de uma vez** (ex.: nome vazio e preço negativo).

Para rodar só os testes unitários da entidade:

```bash
npx jest src/domain/product/entity/product.spec.ts
```

## API (Web)

A aplicação Express sobe com:

```bash
npm run dev
```

Por padrão o servidor escuta na porta `3000` (ou o valor de `PORT` no `.env`).

### Produtos

- `GET /product` — lista produtos (JSON por padrão; envie `Accept: application/xml` para XML).

Exemplo:

```bash
curl -s http://localhost:3000/product
curl -s -H "Accept: application/xml" http://localhost:3000/product
```

## Testes E2E

Os testes de API ficam em `src/infrastructure/api/__tests__/` (customer e product). Para rodar apenas os E2E de produto:

```bash
npx jest product.e2e
```

Para rodar toda a suíte (incluindo E2E):

```bash
npm test
```
