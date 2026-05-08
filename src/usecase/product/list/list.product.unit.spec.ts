import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

const product1 = new Product("1", "A", 10);
const product2 = new Product("2", "B", 20);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test list product use case", () => {
  it("should list all products", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0]).toEqual({
      id: "1",
      name: "A",
      price: 10,
    });
    expect(output.products[1]).toEqual({
      id: "2",
      name: "B",
      price: 20,
    });
  });

  it("should return empty list when there are no products", async () => {
    const repository = MockRepository();
    repository.findAll.mockResolvedValue([]);

    const useCase = new ListProductUseCase(repository);
    const output = await useCase.execute({});

    expect(output.products).toEqual([]);
  });
});
