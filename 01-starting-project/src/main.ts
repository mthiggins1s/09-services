import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

// registering our own TOKEN!
// we pass through a description for debugging purposes
export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token');


// bootstrapApplication(AppComponent,).catch((err) => console.error(err));
// usage of the App-Root Enviornment Injector

bootstrapApplication(AppComponent, {
  // provider; piece of information that lets Angular know that a certain value should be injectable. We can pass TasksService here, and Angular does the rest! Now, we have successfully registered the TasksService with the App-Root Enviornment Injector.
  providers: [{provide: TasksServiceToken, useClass: TasksService}]
}).catch((err) => console.error(err));
