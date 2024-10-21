import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-monster-confirmation-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './delete-monster-confirmation-dialog.component.html',
  styleUrl: './delete-monster-confirmation-dialog.component.scss'
})
export class DeleteMonsterConfirmationDialogComponent {

}
