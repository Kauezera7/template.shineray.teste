alunos = []

while True:
    try:
         num = int(input("Digite quantos alunos deseja cadastrar:"))
         if num <= 0:
             print('Digite um número maior que 0.')
         else:
            break
    except ValueError:
        print("Por favor, digite um número inteiro válido.")


def classificar_aluno(nota):
    if nota <= 5.9:
        return "Reprovado"
    elif 6.0 <= nota <= 10.0:
        return "Passou"

def cadastrar_aluno():
    nome = input("Nome: ")
    idade = int(input("Idade: "))
    nota = float(input("Nota do aluno: "))

    classe = classificar_aluno(nota)

    return {
        "nome": nome,
        "idade": idade,
        "nota": nota,
        "classe": classe
}
def salvar_alunos_em_txt(nome_arquivo, lista_alunos):
    with open(nome_arquivo, 'w', encoding='utf-8') as arquivo:
        for aluno in lista_alunos:
            linha = f"{aluno['nome']},{aluno['idade']},{aluno['nota']},{aluno['classe']}\n"
            arquivo.write(linha)
    print(f"\nDados salvos no arquivo {nome_arquivo}")

for i in range(num):
    print(f'\n Cadastro da nota {i+1}')
    aluno = cadastrar_aluno()
    alunos.append(aluno)

print ('\n Lista de alunos cadastros:')
for i, aluno in enumerate(alunos, start=1):
    print(f'\nAluno {i}:')
    print(f'Nome: {aluno['nome']}')
    print(f'Idade: {aluno["idade"]}')
    print(f'Nota: {aluno["nota"]}')
    print(f'classe: {aluno['classe']}')
    
salvar_alunos_em_txt('alunos.txt', alunos)