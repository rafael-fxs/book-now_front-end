import { Usuario } from './../../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { LivrosService } from '../../servicos/livros.service';
import { Livro } from '../../interfaces/livro';
import { TipoTransacao } from '../../interfaces/TipoTransacao';
import { TransacaoPontos } from '../../interfaces/transacao-pontos';
import { PontosService } from '../../servicos/pontos.service';
import { BaseComponent } from '../../componentes/base.component';

@Component({
  selector: 'app-detalhes-livro',
  templateUrl: './detalhes-livro.component.html',
  styleUrls: ['./detalhes-livro.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class DetalhesLivroComponent extends BaseComponent implements OnInit {
  livro?: Livro;
  livroId!: number;

  constructor(
    private route: ActivatedRoute,
    protected override snackBar: MatSnackBar,
    private livrosService: LivrosService,
    private pontosService: PontosService
  ) {
    super(snackBar);
  }

  ngOnInit(): void {
    this.livroId = Number(this.route.snapshot.paramMap.get('id'));
    this.livrosService.buscarLivroPorId(this.livroId).subscribe({
      next: (dados) => (this.livro = dados),
      error: () => console.error('Erro ao buscar livros'),
    });
  }

  finalizarLivro(): void {
    this.registrarTransacao(TipoTransacao.GANHO);
  }

  comprarLivro(): void {
    this.registrarTransacao(TipoTransacao.GASTO);
  }

  private registrarTransacao(tipo: TipoTransacao): void {
    if (!this.livro) return;
    const pontos: TransacaoPontos = {
      livroId: this.livro.id,
      tipo,
      pontos: this.livro.pontos,
      usuario: { id: 1 },
    };

    this.pontosService.registrarPontos(pontos).subscribe({
      next: () => {
        this.exibirToastSucesso()
      },
      error: (err: HttpErrorResponse) => {
        this.exibirToastErroTratado(err);
      },
    });
  }
}
