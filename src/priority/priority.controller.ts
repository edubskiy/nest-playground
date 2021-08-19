import { PriorityService } from './priority.service';
import { Controller, Get } from '@nestjs/common';
import { GetPriorityDTO } from './dto/get-priority.dto';

@Controller('priority')
export class PriorityController {
  constructor(
    private priorityService: PriorityService
  ) {}

  @Get('/about')
  about() {
    return 'Priority module v0.1';
  }

  @Get('/reset')
  priority(getPriorityDTO: GetPriorityDTO) {
    return this.priorityService.resetPriority();
  }

}
