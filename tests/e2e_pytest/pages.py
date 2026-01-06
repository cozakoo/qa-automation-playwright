from playwright.sync_api import Page

class SomePage:
    def __init__(self, page: Page):
        self.page = page
        self.toggle_button = page.locator("#toogle_id")
        self.icon_no_dark = page.locator("#icon-no-dark")
        self.icon_dark = page.locator("#icon-dark")

    def click_toggle(self):
        """Clickea el botón toggle"""
        self.toggle_button.click()

    def is_dark_mode_enabled(self) -> bool:
        """Devuelve True si el icono dark está visible"""
        return self.icon_dark.is_visible()

    def is_light_mode_enabled(self) -> bool:
        """Devuelve True si el icono no-dark está visible"""
        return self.icon_no_dark.is_visible()


class LoginPage:
    def __init__(self, page: Page, base_url: str):
        self.page = page
        self.base_url = base_url
        self.login_url = f"{self.base_url}"  # Ajusta si tu login tiene otra ruta

        # Inputs
        self.cuit_input = page.get_by_role("textbox", name="N° de CUIT CUIL*")
        self.password_input = page.get_by_role("textbox", name="Contraseña*")
        self.submit_button = page.get_by_role("button", name="INICIAR SESIÓN")

        # Elementos de verificación
        self.heading_after_login = page.get_by_role(
            "heading", name="Autotransporte Terrestre - Trámites"
        )
        self.error_message = page.locator(".alert-danger")
        self.preloader = page.locator(".preloader")

    def goto(self):
        self.page.goto(self.login_url, wait_until="networkidle")
        self.cuit_input.wait_for(state="visible", timeout=60000)

    def perform_login(self, cuit: str, password: str):
        self.wait_for_page_ready()
        self.cuit_input.fill(cuit, timeout=120000)
        self.password_input.fill(password, timeout=120000)
        self.submit_button.click(force=True)

    def assert_login_success(self) -> bool:
        try:
            self.heading_after_login.wait_for(state="visible", timeout=30000)  # espera hasta 30s
            return True
        except:
            self.page.screenshot(path="login_failed.png")  # screenshot de debugging
            return False
    def assert_login_error(self) -> bool:
        return self.error_message.is_visible()

    def wait_for_page_ready(self):
        if self.preloader.is_visible():
            try:
                self.preloader.wait_for(state="hidden", timeout=15000)
            except:
                print("Preloader no desapareció a tiempo, continuando...")

        self.cuit_input.wait_for(state="visible", timeout=120000)
        self.password_input.wait_for(state="visible", timeout=120000)
        self.submit_button.wait_for(state="visible", timeout=120000)
