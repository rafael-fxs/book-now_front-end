import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '../base.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PontosService } from '../../servicos/pontos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SaldoService } from '../../servicos/saldo.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule],
})
export class CabecalhoComponent extends BaseComponent {
  saldoPontos: number = 0;

  constructor(
    private router: Router,
    private pontosService: PontosService,
    protected override snackBar: MatSnackBar,
    private saldoService: SaldoService,
  ) {
    super(snackBar);
  }

  ngOnInit(): void {
    this.atualizarSaldo();
  }

  atualizarSaldo(): void {
    this.saldoService.saldo$.subscribe((novoSaldo) => {
      this.saldoPontos = novoSaldo;
    });
    this.pontosService.obterSaldo(this.usuarioId).subscribe({
      next: (saldo) => (this.saldoPontos = saldo),
      error: (err: HttpErrorResponse) => this.exibirToastErroTratado(err),
    });
  }
  navegarParaHome() {
    this.router.navigate(['/']);
  }

  navegarParaHistorico() {
    this.router.navigate(['/historico']);
  }
}
