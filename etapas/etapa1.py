clientes = []

nome1= input("Digite o nome do cliente: ")
idade1= int(input("Digite a idade do cliente: "))
renda1 = float(input("Digite a renda do cliente: "))
clientes.append({
    "nome": nome1,
    "idade": idade1,
    "renda": renda1
})

nome2= input("Digite o nome do cliente: ")
idade2= int(input("Digite a idade do cliente: "))
renda2 = float(input("Digite a renda do cliente: "))
clientes.append({
    "nome": nome2,
    "idade": idade2,
    "renda": renda2
})
print(clientes)
print( '\nLista de clientes cadastrados')
for zeze, cliente in enumerate(clientes, start=1):
    print(f'\nClinete {zeze}:')
    print(f'Nome: {cliente['nome']}')
    print(f'Idade: {cliente["idade"]}')
    print(f'Renda: {cliente["renda"]}')