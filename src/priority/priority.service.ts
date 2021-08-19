import { mockedPrograms } from './mock/priority-program.mock';
import { PriorityProgram } from './priority.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriorityService {
  async resetPriority(context?: PriorityProgram['id'], programs?: PriorityProgram[]) {
    // TODO
    context = context || 5189
    programs = programs || mockedPrograms as PriorityProgram[];
    const priority: PriorityProgram['metaFields']['priority'] = {};
    const level: Record<number, number> = {};

    // TODO => simulate ltree
    programs.sort((a, b) => {
      if (a.id === b.id) return 0;

      return a.id > b.id ? 1 : -1;
    })

    // Programs are sorted so:
    // - A      1.0
    // -- A.1   1.1
    // -- A.2   1.2
    // - B      2.0
    // -- B.1   2.1
    // -- B.2   2.2

    for (const program of programs) {
      const foundPath = program.path.find(p => p.indexOf(context) > -1) // [0,1,2]
      const foundParentProgram = foundPath[foundPath.length - 2]; // 1
      const foundLevel = foundPath.length - 1; // 2, exclude context parent program
      if (!priority[program.id]) {
        priority[program.id] = '';
      }

      if (priority[foundParentProgram]) {
        priority[program.id] = `${priority[foundParentProgram]}.`
      }

      if (!level[foundParentProgram]) {
        level[foundParentProgram] = 1;
      }

      priority[program.id] += `${level[foundParentProgram]}`

      level[foundParentProgram]++;
    }

    return priority;
  }

  async recountPriority(baseProgram: PriorityProgram, programs: PriorityProgram[]) {
    const basePriority = (baseProgram.metaFields || {}).priority;
    const recountedPriority: PriorityProgram['metaFields']['priority'] = {}

    for (const program of programs) {
      const foundPath = program.path.find(p => p.indexOf(baseProgram.id) > -1) // [0,1,2]
      const foundParentProgram = foundPath[foundPath.length - 2]; // 1

      if (!recountedPriority[program.id] && !basePriority[program.id]) {
        recountedPriority[program.id] = '';
      }

      if (recountedPriority[foundParentProgram] || basePriority[foundParentProgram]) {
        recountedPriority[program.id] = `${recountedPriority[foundParentProgram] || basePriority[foundParentProgram]}.`
      }
    }
  }

  async movePriority() {}
}
