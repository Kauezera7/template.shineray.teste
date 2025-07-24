# --- Cadastro e salvamento ---

produtos = []

quantidade = int(input("Quantos produtos deseja cadastrar? "))

for i in range(1, quantidade + 1):
    print(f"\nProduto {i}:")
    nome = input("Nome: ").strip()
    preco = float(input("Preço: R$ "))

    produtos.append({"nome": nome, "preco": preco})

# Salvar no arquivo
with open("produtos.txt", "w") as arquivo:
    for p in produtos:
        linha = f"{p['nome']},{p['preco']}\n"
        arquivo.write(linha)

print("\nProdutos salvos em 'produtos.txt'.")

# --- Leitura e exibição ---

with open("produtos.txt", "r") as arquivo:
    linhas = arquivo.readlines()

print("\nProdutos lidos do arquivo:")
for linha in linhas:
    nome, preco = linha.strip().split(",")
    preco = float(preco)
    print(f"- {nome}: R$ {preco:.2f}")
