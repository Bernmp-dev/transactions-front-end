import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TransactionEntity } from "../TransactionEntity"

@Component({
  selector: 'app-table-transaction',
  standalone: true,
  imports: [ HttpClientModule, CommonModule, FormsModule ],
  providers: [ TransactionsService ],
  templateUrl: './table-transaction.component.html',
  styleUrl: './table-transaction.component.scss'
})
export class TableTransactionComponent implements OnInit {

  constructor( private transactionService : TransactionsService) {
    
  }

  filterButton: string = "";
  selectedFilter: null | string | number = null;
  isLoading = true;
  transactions : TransactionEntity[] = [];
  selectedTransaction : TransactionEntity = new TransactionEntity;

  @Input()
  transactionForm = new FormGroup({
    category: new FormControl('', Validators.required),
    value: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    date: new FormControl('', Validators.required)
  });

  selectTransaction(transaction : TransactionEntity): void {
    console.log(transaction);
    this.selectedTransaction = transaction;
    console.log(this.selectedTransaction);
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  selectFilter(type : string): void {
    this.filterButton = type;
    console.log(this.filterButton);
    console.log(this.transactions);
  }

  resetFilters() {
    this.filterButton = "";
    this.getTransactions();
  }

  useFilter(): void {
    const value = this.selectedFilter;

    switch (this.filterButton) {
      case 'date':
        this.getTransactionsByDate(value as string);
        break;
      case 'id':
        this.getTransactionsById(value as number);
        break;
      case 'category':
        this.getTransactionsByCategory(value as string);
        break;
      default:
    }
  }

  getTransactionsByCategory(category: string) {
    this.transactionService
    .getTransactionsByCategory(category)
    .subscribe({

      next: (res) => {
        console.log(res);
        this.transactions = res;
      }, 

      error: (httpResponse: HttpErrorResponse) => {
        console.log(httpResponse);
        alert(httpResponse.error)
      },
    }
  )
  }

  getTransactionsByDate(date: string) {
    this.transactionService
    .getTransactionsByDate(date)
    .subscribe({

      next: (res) => {
        console.log(res);
        this.transactions = res;
      }, 

      error: (httpResponse: HttpErrorResponse) => {
        console.log(httpResponse);
        alert(httpResponse.error)
      },
    }
  )
  }

  getTransactions(): void {
    this.isLoading = true;

    this.transactionService
      .getTransactions()
      .subscribe({

        next: (res) => {
          console.log(res);
          this.transactions = res;
        }, 

        error: (httpResponse: HttpErrorResponse) => {
          console.log(httpResponse);
          alert(httpResponse.error)
        },

        complete: () => { 
          this.isLoading = false  
        }}
      )
  }

  getTransactionsById(id: number): void {
    this.transactionService
      .getTransactionsById(id)
      .subscribe({

        next: (res) => {
          console.log(res);
          this.transactions = res;
        }, 

        error: (httpResponse: HttpErrorResponse) => {
          console.log(httpResponse);
          alert(httpResponse.error)
        },
      }
    )
  }

  resetInputs() {
    this.transactionForm.reset({
      category: '',
      value: 0,
      date: ''
    });
  }

  deleteSelectedTransaction(id?: number | null) : void {
    
    this.transactionService
      .deleteTransaction(id!)
      .subscribe({
        
        next: (res) => {
          console.log(res);
          alert("transaction deleted successfully")
          this.getTransactions();
        },
        
        error: (httpResponse: HttpErrorResponse) => {
          console.log(httpResponse);
          alert(httpResponse.error)
        },
  })
  }

  updateTransaction(transaction : TransactionEntity): void {
    console.log("RESPOSTA AQUI = ", this.selectedTransaction);

    this.transactionService
      .updateTransaction(transaction)
      .subscribe({
        
        next: () => {
          alert("Transaction updated")
          this.resetInputs()
          this.selectedTransaction = new TransactionEntity;
        },
        
        error: (httpResponse: HttpErrorResponse) => {
          console.log(httpResponse);
          alert(httpResponse.error)
        },
    })
  }
}
