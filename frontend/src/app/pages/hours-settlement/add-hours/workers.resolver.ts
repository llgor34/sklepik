import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Worker } from 'src/app/interfaces/worker.interface';
import { WorkersService } from 'src/app/services/workers.service';

@Injectable({
  providedIn: 'root',
})
export class WorkersResolver implements Resolve<Worker[]> {
  constructor(private workersService: WorkersService) {}

  resolve() {
    return this.workersService.getWorkers();
  }
}
