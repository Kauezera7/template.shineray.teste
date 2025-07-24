# Lista para armazenar os produtos
produtos = []

# Tenta pegar a quantidade de produtos
while True:
    try:
        quantidade = int(input("Quantos produtos deseja cadastrar? "))
        if quantidade <= 0:
            print("Digite um número maior que zero.")
            continue
        break
    except ValueError:
        print("Entrada inválida. Digite um número inteiro.")

# Cadastrando os produtos
for i in range(1, quantidade + 1):
    print(f"\nProduto {i}:")

    # Nome do produto
    while True:
        nome = input("Nome: ").strip()
        if nome == "":
            print("O nome não pode estar vazio.")
        else:
            break

    # Preço do produto
    while True:
        try:
            preco = float(input("Preço: R$ "))
            if preco <= 0:
                print("O preço deve ser positivo.")
            else:
                break
        except ValueError:
            print("Preço inválido. Digite um número como 99.90")

    # Salva o produto como dicionário
    produto = {"nome": nome, "preco": preco}
    produtos.append(produto)

# Mostrando o resumo da compra
print("\n🛒 Lista de compras:")
total = 0

for item in produtos:
    print(f"- {item['nome']}: R$ {item['preco']:.2f}")
    total += item['preco']

print(f"\nTotal: R$ {total:.2f}")
