import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { __values } from 'tslib';
import { TransactionsService } from '../services/transactions.service';
import { TransactionEntity } from '../TransactionEntity';

@Component({
  selector: 'app-form-transaction',
  standalone: true,
  imports: [ 
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [ TransactionsService ],
  templateUrl: './form-transaction.component.html',
  styleUrl: './form-transaction.component.scss'
})
export class FormTransactionComponent {
  constructor(private transactionService: TransactionsService){

  }

  transactionsArray: TransactionEntity[] = [];
  
  @Input()
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

  addTransaction(transaction: FormGroup['value']) {
    this.transactionsArray.push(transaction);
  }

  insertTransaction(transaction: FormGroup["value"]) {

    this.transactionService
      .insertTransaction(transaction)
      .subscribe({
        
        next: () => {
          alert("transaction saved successfully")
          this.resetInputs()
        },
        
        error: (httpResponse: HttpErrorResponse) => {
          console.log(httpResponse);
          alert(httpResponse.error)
        },
  })
  }

  insertTransactionBatch() {

    this.transactionService
      .insertTransactionBatch(this.transactionsArray)
      .subscribe({
        
        next: () => {
          alert("transaction saved successfully")
          this.resetInputs()
        },
        
        error: (httpResponse: HttpErrorResponse) => {
          console.log(httpResponse);
          alert(httpResponse.error)
        },
  })
  }

}
