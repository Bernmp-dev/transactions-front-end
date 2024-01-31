import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TransactionEntity } from '../TransactionEntity';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor( private http:HttpClient ) { }

  private url = 'http://localhost:8080/transaction';

  public getTransactions() : Observable<any> {
    return this.http.get<any>(this.url);
  }

  getTransactionsById(id: number) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getTransactionsByDate(date: string) {
    return this.http.get<any>(`${this.url}?date=${date}`);
  }

  getTransactionsByCategory(category: string) {
    return this.http.get<any>(`${this.url}/sum?category=${category}`);
  }

  public deleteTransaction(id: number | null): Observable<any>{
    if (id) {
      return this.http.delete<any>(`${this.url}/${id}`);
    } else {
      return this.http.delete<any>(this.url);
    }
  }

  public insertTransaction(transaction: TransactionEntity) 
    : Observable<any> 
  {
    return this.http.post<any>(this.url, transaction);
  }

  insertTransactionBatch(transactions: any[]) {
    return this.http.post<any>(`${this.url}/batch`, transactions);
  }

  public updateTransaction(transaction: TransactionEntity)
    : Observable<any> 
  {
    return this.http.put<any>(`${this.url}/${transaction.id}`, transaction);
  }
}
