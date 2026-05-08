import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Mouse", 49.9);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const result = await useCase.execute({ id: "123" });

    expect(result).toEqual({
      id: "123",
      name: "Mouse",
      price: 49.9,
    });
  });

  it("should propagate error when product is not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(productRepository);

    await expect(useCase.execute({ id: "missing" })).rejects.toThrow(
      "Product not found"
    );
  });
});
