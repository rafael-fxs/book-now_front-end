import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  template: '',
})
export abstract class BaseComponent {
  usuarioId: number = 1;

  constructor(protected snackBar: MatSnackBar) {}

  /**
   * Exibe um toast de sucesso.
   */
  protected exibirToastSucesso(): void {
    this.exibirToast('Operação realizada com sucesso!');
  }

  /**
   * Exibe um toast de erro.
   * @param HttpErrorResponse Erro a ser tratado
   */
  protected exibirToastErroTratado(err: HttpErrorResponse): void {
    if (err?.error?.message) this.exibirToast(err.error.message);
    else this.exibirToast('Não foi possível realizar essa operação');
  }

  /**
   * Exibe um toast com mensagem.
   * @param mensagem Mensagem a ser exibida
   */
  protected exibirToast(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', { duration: 3000 });
  }
}
