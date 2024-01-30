import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent {
  transactionForm = new FormGroup({
    category: new FormControl('', Validators.required),
    value: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    date: new FormControl('', Validators.required)
  });

  resetInputs() {
    this.transactionForm.reset({
      category: '',
      value: 0,
      date: ''
    });
  }

  onSubmit() {
    console.log(this.transactionForm.value);
  }
}
