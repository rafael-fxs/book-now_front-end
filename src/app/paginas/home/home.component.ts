import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LivrosService } from '../../servicos/livros.service';
import { MatCardModule } from '@angular/material/card';
import { BaseComponent } from '../../componentes/base.component';

interface Livro {
  id: number;
  nome: string;
  categoria: string;
  pontos: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class HomeComponent extends BaseComponent implements OnInit {
  livros: Livro[] = [];

  constructor(
    private router: Router,
    protected override snackBar: MatSnackBar,
    private livrosService: LivrosService
  ) {
    super(snackBar)
  }

  ngOnInit(): void {
    this.buscarLivros();
  }

  buscarLivros(): void {
    this.livrosService.buscarLivros().subscribe({
      next: (dados) => (this.livros = dados),
      error: (err: HttpErrorResponse) => this.exibirToastErroTratado(err)
    });
  }

  verDetalhes(id: number): void {
    this.router.navigate([`/livro/${id}`]);
  }
}
