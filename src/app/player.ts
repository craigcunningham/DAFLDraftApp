import { Position } from './position';

export class Player {
  id: number;
  name: string;
  fangraphsId: number;
  salary: number;
  pitcherInd: string;
  eligiblePositions: Position[];
  cbs_id: string;
  fangraphs_name: string;
}
