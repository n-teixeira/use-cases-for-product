import Product from "./product";
import NotificationError from "../../@shared/notification/notification.error";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow(NotificationError);
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError(/Id is required/);
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow(NotificationError);
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError(/Name is required/);
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrow(NotificationError);
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrowError(/Price must be greater than zero/);
  });

  it("should accumulate multiple validation errors at once", () => {
    expect(() => {
      new Product("1", "", -1);
    }).toThrow(NotificationError);

    try {
      new Product("1", "", -1);
    } catch (e) {
      expect(e).toBeInstanceOf(NotificationError);
      const err = e as NotificationError;
      const messages = err.errors.map((x) => x.message);
      expect(messages).toContain("Name is required");
      expect(messages).toContain("Price must be greater than zero");
      expect(messages.length).toBe(2);
    }
  });

  it("should report id, name and price errors together when all invalid", () => {
    try {
      new Product("", "", -1);
    } catch (e) {
      expect(e).toBeInstanceOf(NotificationError);
      const messages = (e as NotificationError).errors.map((x) => x.message);
      expect(messages).toEqual(
        expect.arrayContaining([
          "Id is required",
          "Name is required",
          "Price must be greater than zero",
        ])
      );
      expect(messages.length).toBe(3);
    }
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
