#!/usr/bin/env python3
"""
Demo: Agente ReAct con razonamiento e invocacion de herramientas.
"""

def calculator(a: float, b: float) -> float:
    return a + b

if __name__ == "__main__":
    print("Pensamiento: primero, calcular la suma de 7 y 5.")
    sum_result = calculator(7, 5)
    print(f"Accion: calculator(7, 5) -> {sum_result}")
    print("Observacion: suma recibida")
    print("Pensamiento: despues, multiplicar 3 por el resultado de la suma.")
    product = 3 * sum_result
    print(f"Accion: multiplicar 3 y {sum_result} -> {product}")
    print(f"Respuesta final: la respuesta es {product}")
