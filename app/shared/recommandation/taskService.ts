import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({/* component metadata */})
export class TaskCreatorComponent {
  constructor(private taskService: TaskService) {}

  // Example method to add a task
  addTask() {
    const newTask: Task = { /* gather data from form */ };
    this.taskService.addTask(newTask);
  }
}
