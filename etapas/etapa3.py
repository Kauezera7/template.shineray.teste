def classificar_cliente(renda):
    if renda <= 2000:
        return "Classe baixa"
    elif renda <= 5000:
        return "Classe média"
    else:
        return "Classe alta"

def cadastrar_cliente():
    nome = input("Nome: ")
    idade = int(input("Idade: "))
    renda = float(input("Renda mensal: R$ "))

    classe = classificar_cliente(renda)

    return {
        "nome": nome,
        "idade": idade,
        "renda": renda,
        "classe": classe
    }

# Lista global para armazenar
clientes = []

# Cadastrar um cliente
cliente = cadastrar_cliente()
clientes.append(cliente)

# Exibir cliente
print("\n--- Cliente cadastrado ---")
print(f"Nome: {cliente['nome']}")
print(f"Idade: {cliente['idade']}")
print(f"Renda: R$ {cliente['renda']:.2f}")
print(f"Classe: {cliente['classe']}")
