clientes = []

# Valida entrada com while + try/except
while True:
    try:
        quantidade = int(input("Quantos clientes deseja cadastrar? "))
        if quantidade <= 0:
            print("Digite um número maior que zero.")
            continue
        break
    except ValueError:
        print("Por favor, digite um número inteiro válido.")

# Laço principal
for i in range(quantidade):
    print(f"\n--- Cadastro do cliente {i + 1} ---")

    # Nome não pode ser vazio
    while True:
        nome = input("Nome do cliente: ").strip()
        if nome:
            break
        print("Nome não pode estar vazio!")

    # Idade: entre 0 e 120
    while True:
        try:
            idade = int(input("Idade do cliente: "))
            if 0 <= idade <= 120:
                break
            print("Idade deve estar entre 0 e 120.")
        except ValueError:
            print("Por favor, digite um número inteiro válido.")

    # Renda: número positivo
    while True:
        try:
            renda = float(input("Renda mensal (R$): "))
            if renda >= 0:
                break
            print("A renda não pode ser negativa.")
        except ValueError:
            print("Por favor, digite um número válido (ex: 2500.50).")

    # Classificação de renda
    if renda <= 2000:
        classe = "Baixa"
    elif renda <= 5000:
        classe = "Média"
    else:
        classe = "Alta"

    cliente = {
        "nome": nome,
        "idade": idade,
        "renda": renda,
        "classe": classe
    }

    clientes.append(cliente)

# Mostrar resultado
print("\n🧾 Lista final de clientes:")
for i, cliente in enumerate(clientes, start=1):
    print(f"\nCliente {i}")
    print(f"  Nome: {cliente['nome']}")
    print(f"  Idade: {cliente['idade']} anos")
    print(f"  Renda: R$ {cliente['renda']:.2f}")
    print(f"  Classe social: {cliente['classe']}")
