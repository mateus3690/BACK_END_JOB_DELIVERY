

export class ValidadorCPF {
  private cpf: string;

  constructor(cpf: string) {
    this.cpf = cpf;
  }

  public async validar() {
    try {

      let digito1 = 0;
      let digito2 = 0;

      if ((this.cpf).length == 11) {

        for (let cursor = 0; cursor < 10; cursor++) {

          if (cursor <= 8) {
            digito1 += parseInt(this.cpf[cursor]) * (cursor + 1);
          }
          digito2 += parseInt(this.cpf[cursor]) * (cursor);

          switch (cursor) {
            case 8:
              digito1 = digito1 % 11;
              if (digito1 == 10)
                digito1 = 0;
            case 9:
              digito2 = digito2 % 11;
              if (digito2 == 10)
                digito2 = 0;
          }
        }
      }

      if (String(digito1) == this.cpf[9] && String(digito2) == this.cpf[10]) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }

  }

}
