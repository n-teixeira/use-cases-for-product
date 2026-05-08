import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Integration test update product use case", () => {
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

  it("should update a product and persist changes", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(new Product("1", "Old", 10));

    const useCase = new UpdateProductUseCase(productRepository);
    const output = await useCase.execute({
      id: "1",
      name: "New",
      price: 75,
    });

    expect(output).toEqual({
      id: "1",
      name: "New",
      price: 75,
    });

    const persisted = await productRepository.find("1");
    expect(persisted.name).toBe("New");
    expect(persisted.price).toBe(75);
  });
});
