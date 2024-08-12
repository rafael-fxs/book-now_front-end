import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PontosService } from '../../servicos/pontos.service';
import { BaseComponent } from '../../componentes/base.component';

interface Transacao {
  id: number;
  livroId: number;
  tipo: string;
  pontos: number;
  data: string;
}

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
})
export class HistoricoComponent extends BaseComponent implements OnInit {
  transacoes: Transacao[] = [];
  transacoesVisiveis: Transacao[] = [];
  paginaAtual = 1;
  totalPaginas = 1;
  tamanhoPagina = 5;

  constructor(
    private pontosService: PontosService,
    protected override snackBar: MatSnackBar
  ) {
    super(snackBar)
  }

  ngOnInit(): void {
    this.carregarHistorico();
  }

  carregarHistorico(): void {
    this.pontosService.obterHistorico(this.usuarioId).subscribe({
      next: (dados) => {
        this.transacoes = dados;
        this.totalPaginas = Math.ceil(
          this.transacoes.length / this.tamanhoPagina
        );
        this.atualizarTransacoesVisiveis();
      },
      error: (err: HttpErrorResponse) => {
        this.exibirToastErroTratado(err);
      },
    });
  }

  atualizarTransacoesVisiveis(): void {
    const inicio = (this.paginaAtual - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;
    this.transacoesVisiveis = this.transacoes.slice(inicio, fim);
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarTransacoesVisiveis();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarTransacoesVisiveis();
    }
  }
}
