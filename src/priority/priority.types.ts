export class PriorityProgram {
  id: number;
  path: number[][];
  metaFields?: {
    priority?: Record<string, string>;
    // priority?: Record<string, {index: string, name: string}>;
  } 
} 