import { Component,Input, Output, EventEmitter } from '@angular/core';
import { TaskListComponent } from "./task-list/task-list.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { type NewTaskData } from './task-list/task.list.model(interface)';
import { TasksService } from './tasks.service';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader, MatCardActions } from "@angular/material/card";
/* Tasks = [
  {
    id: 't1',
    userId: 'u1',
    title: 'Master Angular',
    summary:
      'Learn all the basic and advanced features of Angular & how to apply them.',
    dueDate: '2025-12-31',
  },
  {
    id: 't2',
    userId: 'u3',
    title: 'Build first prototype',
    summary: 'Build a first prototype of the online shop website',
    dueDate: '2024-05-31',
  },
  {
    id: 't3',
    userId: 'u3',
    title: 'Prepare issue template',
    summary:
      'Prepare and describe an issue template which will help with project management',
    dueDate: '2024-06-15',
  },
]*/

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskListComponent, NewTaskComponent, MatToolbar, MatIcon, MatCard, MatCardContent, MatCardTitle, MatCardHeader, MatCardActions],
  templateUrl: './task.component.html',
  styleUrls: ["./task.component.css"]
})

export class TaskComponent {
   @Input({required: true}) userId!:string;
   @Input({required: true}) name!: string;
   isAddingTask: boolean = false; // to track whether the user is adding a new task is false initially
   @Output() addTask = new EventEmitter<string>(); //output property to emit an event to the parent component

   //private property for the TasksService.ts
   //private tasksService: TasksService;
   constructor(private tasksService: TasksService) {
   } // we are injecting this tasksService when it finds a dependancy like

   // Properties for new task form
   newTaskTitle = '';
   newTaskSummary = '';
   newTaskDueDate = '';

/*task component should receive the user id and name as input properties from above
get selectedUserTask() {
  return this.tasks.filter((tasks) => tasks.userId === this.userId); // filter return an array of all the tasks that match the user id
}*/
get selectedUserTask() {
  return this.tasksService.getUserTasks(this.userId);
}

/*this onCompleteTask class has been moved to the TasksService.js as a method removeTask(id: string )
onCompleteTask(id: string) {
  this.tasks = this.tasks.filter((task) => task.id !== id); //filter method creates a new array with all elements that pass the test implemented by the provided function
}  //we want to remove the task with the given id from the tasks array if  the id does not the same as id of the task to be removed*/
onCompleteTask(id: string) {
  this.tasksService.completeTask(id);
}

// this wil add a new task to the tasks array when I click the add task button
onStartAddTask() {
 this.isAddingTask = true; // set isAddingTask to true when the user clicks the add task button the new task component will be added
}

onCancelTask(){
  this.isAddingTask = false; // set isAddingTask to false when the user clicks the cancel button the new task component will be removed
} // I have add this cancel function instead of using the cancel button I can click on the background to cancel also


/* Submission
// if I didn't export NewTaskData
onAddTask(taskData: title: string; summary: string; date: string) {

}
*/

/* // We are nolong triggering this become it is now it's been added to the service class task.service.ts
onAddTask(taskData: NewTaskData) {
  this.isAddingTask = false; // so that the onAddTask is rendered when the adding task is false = false
}  // tasks has the array of id, userId,title ,summary and dueDate we are pushing data into this via the push()
*/
}
