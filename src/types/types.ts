import { CellArray, Stack } from "../utils";

export interface CellDataState {
    data: CellArray;
    memory: {
        undo: Stack;
        redo: Stack;
    }
}

export interface Action {
    type: string;
    cell?: {
        x: number;
        y: number;
    }
    input?: any;
}

export interface Cell {
    value?: number;
    notes?: boolean[];
    locked?: boolean;
    selected?: boolean;
}

export interface BoardData {
    height: number;
    groupHeight: number;
    width: number;
    groupWidth: number;
}