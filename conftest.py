import pytest
from playwright.sync_api import sync_playwright

@pytest.fixture(scope="session")
def browser():
    """Inicializa el navegador Playwright"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # headless=True en CI
        yield browser
        browser.close()

@pytest.fixture
def page(browser):
    """Crea una nueva página por test"""
    page = browser.new_page()
    yield page
    page.close()

@pytest.fixture
def my_base_url():
    """URL base del entorno de Django"""
    return "https://gb.chubut.gov.ar/tramites-at_test/"
