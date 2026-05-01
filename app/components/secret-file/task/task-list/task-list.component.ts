import { Component, Input, Output, EventEmitter, inject} from '@angular/core'; // since we are using inject, we still need Output and EventEmitter for the complete event

import { type Task } from './task.list.model(interface)';

import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

//import { Task } from 'zone.js/lib/zone-impl';

/* this is a blueprint of how a task object should look like
interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: number | string;
} //Defining an interface for Task object from task.model.ts or in my case it will be the dummyTasks object
*/

//app-task
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  //I am importing the const dummyTasks object here
  @Input({required: true}) task!: Task ; // A input is a doorway that allows data to enter a component from the outside world.
  @Output() complete = new EventEmitter<string>(); //output property to emit an event to the parent component
  private tasksService = inject(TasksService);

 /*This was from when I was still emitting my task output
  onCompleteTask(){
  this.complete.emit(this.task.id); //emitting a new event when the button is clicked
}*/
 onCompleteTask(){
  this.tasksService.completeTask(this.task.id);
  this.complete.emit(this.task.id); // Emit the event to notify parent component
 }
  //this is for the cancel button
 // @Output() cancel = new EventEmitter<void>();

}
