import { Injectable, signal } from "@angular/core";
import { Task } from "./task.model";

// should also be decorated with @Injectable
// Injectable tells Angular that this class can be injected into other class/components/services/etc.
// Should also take a configuration object of providedIn.
@Injectable({
  // means that this service can now be injected into any component,directive, or service in the Angular application.
  providedIn: 'root',
})
// job of this service is to manage tasks
export class TasksService {
  // Task is being exxported via interface; this signal will manage an array of tasks.
  tasks = signal<Task[]>([]);

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
  }

  // we can then call the 'addTask()' from inside the newTask component.
}