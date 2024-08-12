import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LIVROS_MOCK } from './livros-mock';
import { Livro } from '../interfaces/livro';

@Injectable({
  providedIn: 'root',
})
export class LivrosService {
  constructor() {}

  buscarLivros(): Observable<Livro[]> {
    return of(LIVROS_MOCK);
  }

  buscarLivroPorId(id: number): Observable<Livro> {
    const livro = LIVROS_MOCK.find((l) => l.id === id);
    return of(livro!);
  }
}
