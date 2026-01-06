import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test('Login válido', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(
    process.env.USER_CUIT!,
    process.env.USER_PASS!
  );

  await loginPage.assertLoginSuccess();
});