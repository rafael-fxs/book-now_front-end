import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TransacaoPontos } from '../interfaces/transacao-pontos';

@Injectable({
  providedIn: 'root',
})
export class PontosService {
  private baseUrl = `${environment.apiUrl}/transacoes`;

  constructor(private http: HttpClient) {}

  obterHistorico(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/historico/${usuarioId}`);
  }

  registrarPontos(transacaoPontos: TransacaoPontos): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}`, transacaoPontos);
  }

  obterSaldo(usuarioId: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/saldo/${usuarioId}`);
  }
}
