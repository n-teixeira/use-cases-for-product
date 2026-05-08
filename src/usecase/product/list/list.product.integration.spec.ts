import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe("Integration test list product use case", () => {
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

  it("should list products from the database", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(new Product("1", "P1", 100));
    await productRepository.create(new Product("2", "P2", 200));

    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products.map((p) => p.name).sort()).toEqual(["P1", "P2"]);
  });
});
