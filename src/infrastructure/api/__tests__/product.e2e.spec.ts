import { app, sequelize } from "../express";
import request from "supertest";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../product/repository/sequelize/product.repository";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products as JSON with status 200", async () => {
    const repository = new ProductRepository();
    await repository.create(new Product("1", "Keyboard", 120));
    await repository.create(new Product("2", "Mouse", 49.9));

    const response = await request(app).get("/product").send();

    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);

    const productsByName: Record<string, { id: string; name: string; price: number }> = {};
    for (const p of response.body.products) {
      productsByName[p.name] = p;
    }

    expect(productsByName["Keyboard"]).toEqual({
      id: "1",
      name: "Keyboard",
      price: 120,
    });
    expect(productsByName["Mouse"]).toEqual({
      id: "2",
      name: "Mouse",
      price: 49.9,
    });
  });

  it("should list all products as XML with status 200", async () => {
    const repository = new ProductRepository();
    await repository.create(new Product("1", "Keyboard", 120));
    await repository.create(new Product("2", "Mouse", 49.9));

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>Keyboard</name>`);
    expect(listResponseXML.text).toContain(`<name>Mouse</name>`);
    expect(listResponseXML.text).toContain(`<price>120</price>`);
    expect(listResponseXML.text).toContain(`<price>49.9</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
