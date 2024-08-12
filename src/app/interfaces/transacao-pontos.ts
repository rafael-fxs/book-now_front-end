import { TipoTransacao } from "./TipoTransacao";
import { Usuario } from "./usuario";

export interface TransacaoPontos {
  id: number;
  usuario: Usuario;
  livroId: number;
  pontos: number;
  tipo: TipoTransacao
  dataTransacao: Date | null
}
