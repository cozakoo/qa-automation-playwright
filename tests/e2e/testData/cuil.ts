import { faker } from '@faker-js/faker';

function calcularDigitoVerificador(base: string): number {
  const coeficientes = [5,4,3,2,7,6,5,4,3,2];
  let suma = 0;

  for (let i = 0; i < coeficientes.length; i++) {
    suma += parseInt(base[i]) * coeficientes[i];
  }

  const resto = suma % 11;
  const digito = 11 - resto;

  if (digito === 11) return 0;
  if (digito === 10) return 9;
  return digito;
}

export function generarCuil(): string {
  const sexo = faker.helpers.arrayElement(['20', '27']);
  const dni = faker.number.int({ min: 10000000, max: 99999999 }).toString();

  const base = `${sexo}${dni}`;
  const digito = calcularDigitoVerificador(base);

  return `${sexo}${dni}${digito}`;
}
