import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormTransactionComponent } from './form-transaction/form-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    FormTransactionComponent,
    FormsModule,
    ReactiveFormsModule
   ],
})
export class AppComponent {
  // title = 'transactions';
}
