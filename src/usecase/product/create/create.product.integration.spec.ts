import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Integration test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product and persist it", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute({ name: "Notebook", price: 1999 });

    expect(output.name).toBe("Notebook");
    expect(output.price).toBe(1999);

    const persisted = await productRepository.find(output.id);
    expect(persisted.name).toBe("Notebook");
    expect(persisted.price).toBe(1999);
  });
});
