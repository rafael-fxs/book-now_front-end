import { HttpInterceptorFn } from '@angular/common/http';
import { finalize, of, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CabecalhoComponent } from '../componentes/cabecalho/cabecalho.component';
import { PontosService } from '../servicos/pontos.service';
import { SaldoService } from '../servicos/saldo.service';

export const SaldoInterceptor: HttpInterceptorFn = (req, next) => {
  const usuarioId = 1;
  const saldoService = inject(SaldoService);
  const pontosService = inject(PontosService);
  if (!req.url.includes('/saldo/')) {
    return next(req).pipe(
      // Após a requisição original, buscar o saldo atualizado

      switchMap((response) => {
        // Chamar o backend para obter o saldo atualizado
        return pontosService.obterSaldo(usuarioId).pipe(
          tap((novoSaldo) => {
            // Atualizar o saldo no serviço
            saldoService.atualizarSaldo(novoSaldo);
          }),
          // Retornar o response original para continuar o fluxo normal
          switchMap(() => of(response))
        );
      })
    );
  } else {
    // Se for uma requisição de saldo, apenas prossiga sem fazer nada
    return next(req);
  }
};
