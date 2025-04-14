import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

// should also be decorated with @Injectable
// Injectable tells Angular that this class can be injected into other class/components/services/etc.
// Should also take a configuration object of providedIn.
// @Injectable({
//   // providedIn: 'root' means that this service can now be injected into any component,directive, or service in the Angular application.
//   providedIn: 'root',
// })
// job of this service is to manage tasks
export class TasksService {
  // Task is being exxported via interface; this signal will manage an array of tasks.
  private tasks = signal<Task[]>([]);
  // injecting the loggingService.
  private loggingService = inject(LoggingService);

  // since we made the tasks signal private, we need a way to inject the service and expose the data to other places. We can use a readonly signal, which yields a signal.
  allTasks = this.tasks.asReadonly();

  // add task method which can be triggered in the new-task component when the form is submitted (onAddTask).
  addTask(taskData: {title: string; description: string}) {
    // spread the taskData and its properties into this new object.
      // we will also tell TS that newTask will be of type Task to get extra type checking.
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN'
    };
    // update the tasks signal
    // this function will automatically recieve the old tasks and should then yield the new tasks from the signal. We will then use a spread operator with the oldTasks, and then add a 'new task' to the array.
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('ADDED TASK with title ' + taskData.title)
  }

  // we can then call the 'addTask()' from inside the newTask component.

  // Now, we want to finish this TasksService, and be able to change the 'status' of our tasks!
  // we pass the TaskStatus as newStatus, since in the TaskStatus, we are exporting the status of said tasks, so 'OPEN' 'IN PROGRESS' and 'DONE'
  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    // we then reach out to our tasks and call the update method. we then get our oldTasks and then return our new tasks with .map(), which will produce a new array. We can then pass another function through .map(), which will execute on every task in the new array and will do this automatically.
    this.tasks.update((oldTasks) => oldTasks.map((task) => task.id === taskId ? {...task, status: newStatus} : task));

    // so, what is all of this above doing? Well, this updates the tasks array by replacing the old tasks array with the new one, where for one task where the ID's match, the task item will be replaced!
    
    this.loggingService.log('CHANGE TASK STATUS TO ' + newStatus);
  }
}