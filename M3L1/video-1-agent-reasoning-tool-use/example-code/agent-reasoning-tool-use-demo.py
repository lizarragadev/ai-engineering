#!/usr/bin/env python3
"""
Demo: Razonamiento del agente con herramienta de calculadora.
"""

def calculator(a: float, b: float, operation: str) -> float:
    """Herramienta de calculadora simple que soporta add, sub, mul, div."""
    if operation == "add":
        return a + b
    elif operation == "sub":
        return a - b
    elif operation == "mul":
        return a * b
    elif operation == "div":
        return a / b
    else:
        raise ValueError(f"Operacion no soportada: {operation}")

class Agent:
    def __init__(self):
        self.history = []

    def reason_and_act(self, question: str):
        print("Razonamiento del agente: determinando pasos para resolver la pregunta.")
        self.history.append("Reasoning: parse question")
        parts = question.strip("?").split()
        a, op_word, b = float(parts[2]), parts[3], float(parts[4])
        op_map = {"plus": "add", "mas": "add", "minus": "sub", "times": "mul", "divided": "div"}
        operation = op_map.get(op_word)
        print(f"Accion del agente: invocando calculator({a}, {b}, '{operation}')")
        result = calculator(a, b, operation)
        print(f"Observacion del agente: resultado recibido {result}")
        print(f"Respuesta final: el resultado es {result}")

if __name__ == "__main__":
    question = "Cuanto es 2 mas 3?"
    Agent().reason_and_act(question)
