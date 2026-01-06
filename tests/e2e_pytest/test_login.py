import pytest
from pages import LoginPage, SomePage  # Asegurate que LoginPage y SomePage estén en pages.py

def test_login_exitoso(page, my_base_url):
    login = LoginPage(page, my_base_url)
    login.goto()
    login.perform_login("20954547605", "system2025")
    assert login.assert_login_success()

def test_login_invalido(page, my_base_url):
    login = LoginPage(page, my_base_url)
    login.goto()
    login.perform_login("20954547605", "asasdasdasd")
    assert login.assert_login_error()