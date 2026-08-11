import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormTransactionComponent } from './form-transaction/form-transaction.component';
import { TableTransactionComponent } from './table-transaction/table-transaction.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        FormTransactionComponent,
        TableTransactionComponent
    ]
})
export class AppComponent {
}