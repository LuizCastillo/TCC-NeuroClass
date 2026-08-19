"""
Instância compartilhada do limiter (slowapi), usada para aplicar rate
limiting básico em endpoints sensíveis a abuso (Manual, capítulo 72).
Fica em módulo próprio para evitar import circular entre main.py e as rotas.
"""
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
