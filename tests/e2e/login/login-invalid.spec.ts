import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { getUserRandomData } from '../testData/randomDataUtils';


test('Login inválido - credenciales incorrectas', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  const user = getUserRandomData();

  await loginPage.performLogin(
    user.cuil,
    user.pass
  );

  await loginPage.assertLoginError();
});
