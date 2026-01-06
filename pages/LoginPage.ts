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
      name: 'Autotransporte Terrestre - Trámites',
    });
    this.preloader = page.locator('.preloader');

  }

  async goto() {
    if (!process.env.LOGIN_URL) {
      throw new Error('LOGIN_URL no está definida en el archivo .env');
    }

    await this.page.goto(process.env.LOGIN_URL!, {
      waitUntil: 'networkidle', // espera hasta que no haya más requests
      timeout: 120000, //2 minutos
    });

    // Asegura que el formulario esté listo
    await this.cuitInput.waitFor({ state: 'visible', timeout: 60000 });
  }

  async performLogin(cuit: string, password: string) {
    if (!cuit || !password) {
      throw new Error('CUIT o contraseña no definidos');
    }

    // Espera a que la página y los inputs estén listos
    await this.waitForPageReady();

    await this.cuitInput.fill(cuit, { timeout: 120000 }); // hasta 2 min
    await this.passwordInput.fill(password, { timeout: 120000 });

    await this.submitButton.click({ force: true });
  }




  async assertLoginSuccess() {
    await expect(this.headingAfterLogin).toBeVisible();
  }

  async assertLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async waitForPageReady() {
  // Espera al preloader si existe
  if (await this.preloader.isVisible()) {
    await this.preloader
      .waitFor({ state: 'hidden', timeout: 15000 }) // 15s, más confiable
      .catch(() => {
        console.warn('Preloader no desapareció a tiempo, continuando...');
      });
  }

  // Espera explícita a los campos de login
  await this.cuitInput.waitFor({ state: 'visible', timeout: 120000 }); // 2 min
  await this.passwordInput.waitFor({ state: 'visible', timeout: 120000 });
  await this.submitButton.waitFor({ state: 'visible', timeout: 120000 });
}

}