import { Position } from './position';

export class Player {
  id: number;
  name: string;
  fangraphsId: number;
  salary: number;
  pitcherInd: string;
  eligiblePositions: Position[];
}
