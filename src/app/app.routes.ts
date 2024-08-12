import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { DetalhesLivroComponent } from './paginas/detalhes-livro/detalhes-livro.component';
import { HistoricoComponent } from './paginas/historico/historico.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'livro/:id', component: DetalhesLivroComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: '**', redirectTo: '' } // Redireciona para a página inicial se a rota não for encontrada
];
