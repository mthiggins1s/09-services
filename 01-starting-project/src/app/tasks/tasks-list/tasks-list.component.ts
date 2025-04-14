import { Component, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})

// we also want to use the TasksService here, because we will output the tasks here!
export class TasksListComponent {
  // instead of using the constructor, you can assign an injected value here with the 'inject()' function, we can be use to request a dependency from Angular with a token(tasksService) or the service class name.
  private tasksService = inject(TasksService);
  selectedFilter = signal<string>('all');

  // we can now replace the dumnmy tasks array that is empty, with the tasks from our service. (tasks is a signal). Now that its a signal, we need to call it in the template and track it as a unique identifier!
  tasks = this.tasksService.allTasks;

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }

  // So what did we learn so far; We got the TasksService that holds and manages the data/logic to change it, and we have the new-tasks component which calls addTask to trigger that method where a new task is added, as well as the tasks-list component where we also inject the service to get ahold and output the tasks!

}
