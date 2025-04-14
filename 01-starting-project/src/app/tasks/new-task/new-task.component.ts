import { Component, ElementRef, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');
  // import TasksService privately.
  // initalize the TasksService by instantiating it. This will make it available. 

  // DEPENDENCY INJECTION BELOW!!!

  // * We can REQUEST a service as a dependency from Angular by specifying it as a paramenter.
    // with the 'private' keyword, so TS will automatically create a property with the same name.
  constructor(private tasksService: TasksService) {}

  onAddTask(title: string, description: string) {
    // we can now call this.tasksService.addTask and pass our data to onAddTask.
    this.tasksService.addTask({title: title, description: description})
    this.formEl()?.nativeElement.reset();
  }

  // with the notes above, this is how can now use this service, but we can only share data here, and now we pretty much have a service that is useless. We can fix it with DEPENDENCY INJECTION!!
}
