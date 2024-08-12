import { TipoTransacao } from "./TipoTransacao";
import { Usuario } from "./usuario";

export interface TransacaoPontos {
  usuario: Usuario;
  livroId: number;
  pontos: number;
  tipo: TipoTransacao
}
