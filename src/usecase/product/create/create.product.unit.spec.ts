import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = { name: "Book", price: 29.99 };
    const output = await useCase.execute(input);

    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);
    expect(output.id).toEqual(expect.any(String));
    expect(productRepository.create).toHaveBeenCalled();
  });

  it("should throw an error when name is empty", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    await expect(
      useCase.execute({ name: "", price: 10 })
    ).rejects.toThrow("Name is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    await expect(
      useCase.execute({ name: "Item", price: -1 })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
