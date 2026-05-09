import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductYupValidator from "../validator/product.yup.validator";
import ProductValidatable from "../validator/product-validatable.interface";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<ProductValidatable> {
    return new ProductYupValidator();
  }
}
