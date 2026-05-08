import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe("Integration test find product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    await productRepository.create(new Product("1", "Keyboard", 120));

    const result = await useCase.execute({ id: "1" });

    expect(result).toEqual({
      id: "1",
      name: "Keyboard",
      price: 120,
    });
  });

  it("should throw when product does not exist", async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    await expect(useCase.execute({ id: "x" })).rejects.toThrow(
      "Product not found"
    );
  });
});
