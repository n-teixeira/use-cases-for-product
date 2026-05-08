import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const MockRepository = (entity: Product) => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(entity)),
    update: jest.fn(),
  };
};

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const product = new Product("1", "Original", 50);
    const productRepository = MockRepository(product);
    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Updated",
      price: 99,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
    expect(productRepository.update).toHaveBeenCalled();
  });

  it("should throw when new name is invalid", async () => {
    const product = new Product("1", "Original", 50);
    const productRepository = MockRepository(product);
    const useCase = new UpdateProductUseCase(productRepository);

    await expect(
      useCase.execute({ id: "1", name: "", price: 10 })
    ).rejects.toThrow("Name is required");
  });

  it("should throw when new price is invalid", async () => {
    const product = new Product("1", "Original", 50);
    const productRepository = MockRepository(product);
    const useCase = new UpdateProductUseCase(productRepository);

    await expect(
      useCase.execute({ id: "1", name: "Ok", price: -5 })
    ).rejects.toThrow("Price must be greater than zero");
  });

  it("should throw when product is not found", async () => {
    const productRepository = MockRepository(new Product("1", "X", 1));
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new UpdateProductUseCase(productRepository);

    await expect(
      useCase.execute({ id: "missing", name: "X", price: 1 })
    ).rejects.toThrow("Product not found");
  });
});
