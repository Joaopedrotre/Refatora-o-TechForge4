class Consumidor {
  private _nome: string;
  private _idade: number;
  private _email: string;

  constructor(nome: string, idade: number, email: string) {
    this._nome = Consumidor.validarNome(nome);
    this._idade = Consumidor.validarIdade(idade);
    this._email = Consumidor.validarEmail(email);
  }

  private static validarNome(nome: string): string {
    const nomeLimpo = nome?.trim();
    if (!nomeLimpo) {
      throw new Error("O nome não pode ser vazio.");
    }
    return nomeLimpo;
  }

  private static validarIdade(idade: number): number {
    if (!Number.isInteger(idade) || idade < 0 || idade > 150) {
      throw new Error(`Idade inválida: ${idade}. Informe um inteiro entre 0 e 150.`);
    }
    return idade;
  }

  private static validarEmail(email: string): string {
    const emailLimpo = email?.trim();
    if (!emailLimpo || !emailLimpo.includes("@")) {
      throw new Error(`E-mail inválido: ${email}`);
    }
    return emailLimpo;
  }

  get nome(): string {
    return this._nome;
  }

  set nome(valor: string) {
    this._nome = Consumidor.validarNome(valor);
  }

  get idade(): number {
    return this._idade;
  }

  set idade(valor: number) {
    this._idade = Consumidor.validarIdade(valor);
  }

  get email(): string {
    return this._email;
  }

  set email(valor: string) {
    this._email = Consumidor.validarEmail(valor);
  }

  formatarExibicao(): string {
    return `Consumidor: ${this._nome} (${this._idade} anos) - ${this._email}`;
  }
}

// Array para armazenar os consumidores
const listaConsumidores: Consumidor[] = [];

// 4. Função para calcular a média de idade
function calcularMediaIdade(consumidores: Consumidor[]): number {
  if (consumidores.length === 0) return 0;
  const somaIdades = consumidores.reduce((acc, c) => acc + c.idade, 0);
  return somaIdades / consumidores.length;
}

// 5. Função para encontrar extremos de idade
function obterExtremosIdade(consumidores: Consumidor[]): { maisVelho: Consumidor | undefined; maisNovo: Consumidor | undefined } {
  let maisVelho: Consumidor | undefined = consumidores[0];
  let maisNovo: Consumidor | undefined = consumidores[0];

  if (maisVelho != undefined && maisNovo != undefined) {

    for (const c of consumidores) {
      if (c.idade > maisVelho.idade) maisVelho = c;
      if (c.idade < maisNovo.idade) maisNovo = c;
    }
  }

  return { maisVelho, maisNovo };
}

// --- EXECUÇÃO DE TESTE ---
listaConsumidores.push(new Consumidor("Ana Silva", 30, "ana@email.com"));
listaConsumidores.push(new Consumidor("Carlos Souza", 22, "carlos@email.com"));
listaConsumidores.push(new Consumidor("Mariana Lima", 45, "mariana@email.com"));
listaConsumidores.push(new Consumidor("Roberto Alves", 19, "roberto@email.com"));
listaConsumidores.push(new Consumidor("Fernanda Dias", 33, "fernanda@email.com"));

console.log("=== LISTA DE CONSUMIDORES ===");
listaConsumidores.forEach(c => console.log(c.formatarExibicao()));

console.log("\n=== ANÁLISE ESTATÍSTICA ===");
console.log(`Média das Idades: ${calcularMediaIdade(listaConsumidores).toFixed(1)} anos`);

const { maisVelho, maisNovo } = obterExtremosIdade(listaConsumidores);
if (maisVelho != undefined && maisNovo != undefined) {
  console.log(`Mais Velho(a): ${maisVelho.nome} (${maisVelho.idade} anos)`);
  console.log(`Mais Novo(a): ${maisNovo.nome} (${maisNovo.idade} anos)`);
} else {
  console.log("Não foi possível calcular os extremos de idade");
}