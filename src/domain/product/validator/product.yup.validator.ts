import ValidatorInterface from "../../@shared/validator/validator.interface";
import ProductValidatable from "./product-validatable.interface";
import * as yup from "yup";

export default class ProductYupValidator
  implements ValidatorInterface<ProductValidatable>
{
  validate(entity: ProductValidatable): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .min(0, "Price must be greater than zero")
            .required(),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.validationPrice(),
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
