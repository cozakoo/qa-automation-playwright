import { faker } from "@faker-js/faker";
import { OrderDetails } from "./orderDetailsInterface";
import { User } from "./userInterface";
import { generarCuil } from "./cuil";

export function getOrderDetailsRandomData(): OrderDetails {
  return {
    name: faker.person.firstName(),
    country: faker.location.country(),
    city: faker.location.city(),
    credicard: faker.finance.creditCardNumber(),
    month: faker.date.month(),
    year: faker.date.future().getFullYear().toString(),
  };
}

export function getUserRandomData(): User {
  return {
    cuil: generarCuil(),
    pass: faker.internet.password(),
  };
}
