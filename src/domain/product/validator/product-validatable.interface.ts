import Notification from "../../@shared/notification/notification";

export default interface ProductValidatable {
  id: string;
  name: string;
  notification: Notification;
  validationPrice(): number;
}
