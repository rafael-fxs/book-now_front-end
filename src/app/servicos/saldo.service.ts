import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {
  private saldoSubject = new BehaviorSubject<number>(0);
  saldo$ = this.saldoSubject.asObservable();

  atualizarSaldo(novoSaldo: number) {
    this.saldoSubject.next(novoSaldo);
  }
}
