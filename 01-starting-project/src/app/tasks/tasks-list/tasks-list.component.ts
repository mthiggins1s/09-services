import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider]
})

// we also want to use the TasksService here, because we will output the tasks here!
export class TasksListComponent {
  // instead of using the constructor, you can assign an injected value here with the 'inject()' function, we can be use to request a dependency from Angular with a token(tasksService) or the service class name.
  private tasksService = inject(TasksServiceToken);
  private selectedFilter = signal<string>('all');

  // with this, we can now access the injected value.
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  // we can now replace the dumnmy tasks array that is empty, with the tasks from our service. (tasks is a signal). Now that its a signal, we need to call it in the template and track it as a unique identifier!
    // *UPDATED; computed will now return a new computed signal, and will be recomputed when any of the dependent signals change.
  tasks = computed(() => {
    // we then filter the tasks from the TasksService based on the selectedFilter.
    // we can use a 'switch' statement to SWITCH the value that is stored in the selectedFilter signal. Angular will register this, set up a subscription and recompute the value whenever the value changes.
    switch(this.selectedFilter()) {
        // if the case is OPEN, we only want the tasks that have a status of 'OPEN'.
      case 'open':
          return this.tasksService.allTasks().filter(task => task.status === 'OPEN');
          // if the case is in progress, we only want the tasks that have a status of 'IN_PROGRESS'.
      case 'in-progress':
          return this.tasksService.allTasks().filter(task => task.status === 'IN_PROGRESS');
          // if the case is done, we only want the tasks that have a status of 'DONE'.
      case 'done':
          return this.tasksService.allTasks().filter(task => task.status === 'DONE');
      // this defefault case will return all tasks.
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  // So what did we learn so far; We got the TasksService that holds and manages the data/logic to change it, and we have the new-tasks component which calls addTask to trigger that method where a new task is added, as well as the tasks-list component where we also inject the service to get ahold and output the tasks!


  // Next, the tasks signal will be re-computed when the selectedFilter changes or when the tasks change!
}
