import { PriorityService } from './priority.service';
import { Controller, Get } from '@nestjs/common';
import { GetPriorityDTO } from './dto/get-priority.dto';

@Controller('priority')
export class PriorityController {
  constructor(
    private priorityService: PriorityService
  ) {}

  @Get('/program')
  priority(getPriorityDTO: GetPriorityDTO) {
    return this.priorityService.resetPriority();
  }

}
