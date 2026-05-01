import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; //this for the two way binging ngModel we will use FormsModule, which will unlock  [(ngModel)]="enteredTitle"
import { type NewTaskData } from '../task-list/task.list.model(interface)';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule], // FormsModule[(ngModel)] this FormsModule takes control of the <form></form> and it will listen to the submission <input type="submit">
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  //this is for the cancel button
@Output() cancel = new EventEmitter<void>();
//injecting 
private tasksSevice = inject(TasksService);


// Triggered when the Cancel button in the template
onCancel(): void {
  this.cancel.emit(); // Emits a void event to notify parent component
}

              /*Directives*/
//Two way binging, this property will be updated each time the a value is add by the user
enteredTitle = '';
enteredSummary = '';
enteredDueDate = '';


  /* Submission */
// when the create button submit the title, summary and date data when randered
//@Output() add = new EventEmitter<{title: string; summary: string; date: string}>(); this EventEmitter is of type Object

//I have export interface NewTaskData
@Output() add = new EventEmitter<NewTaskData>();

/* I have now injected TasksService*/
/*onSubmit() {
this.add.emit({
  title: this.enteredTitle,
  summary: this.enteredSummary,
  date: this.enteredDueDate,
})
}*/
onSubmit() {
this.tasksSevice.addTask ({
  title: this.enteredTitle,
  summary: this.enteredSummary,
  date: this.enteredDueDate,
},
this.userId
);
this.cancel.emit(); // after I have submit the new task component will the close
 }
}