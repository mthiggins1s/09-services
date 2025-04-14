import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
// import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // we can add a providers array to that component. The idea is that is allows you to set up values that should be injectable, that are tied to the element injector that belongs to this componenet.
  // providers: [TasksService],
  // we add TasksService so all task-related components have access to the service (Task-List, Task-Item, etc.)

  // * important: all 'child' components, so all components used in the template.component.html, will also have access to the element injector, but other components like the AppComponent.ts, will NOT have access to it. The service is RESTRICTED to that part of your component tree.
})
export class TasksComponent {}
