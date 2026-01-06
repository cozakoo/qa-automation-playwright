import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly cuitInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly headingAfterLogin: Locator;
  readonly errorMessage: Locator;
  readonly preloader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cuitInput = page.getByRole('textbox', {
      name: 'N° de CUIT CUIL*',
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Contraseña*',
    });

    this.submitButton = page.getByRole('button', {
      name: 'INICIAR SESIÓN',
    });

    this.errorMessage = page.locator('.alert-danger');


    this.headingAfterLogin = page.getByRole('heading', {
      name: 'Autotransporte Terrestre - Tr',
    });
    this.preloader = page.locator('.preloader');

  }

  async goto() {
    if (!process.env.LOGIN_URL) {
      throw new Error('LOGIN_URL no está definida en el archivo .env');
    }

    await this.page.goto(process.env.LOGIN_URL!, {
      waitUntil: 'load',
      timeout: 60000,
    });

    // Asegura que el formulario esté listo
    await this.cuitInput.waitFor({ state: 'visible' });
  }

  async performLogin(cuit: string, password: string) {
    if (!cuit || !password) {
      throw new Error('CUIT o contraseña no definidos');
    }

    await this.cuitInput.fill(cuit);
    await this.passwordInput.fill(password);

    await this.submitButton.click({ force: true });
  }



  async assertLoginSuccess() {
    await expect(this.headingAfterLogin).toBeVisible();
  }

  async assertLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async waitForPageReady() {
    if (await this.preloader.isVisible()) {
      await this.preloader
  .waitFor({ state: 'hidden', timeout: 5000 })
  .catch(() => {});
    }
  }
}