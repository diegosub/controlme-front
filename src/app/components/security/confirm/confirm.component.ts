import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudController } from '../../generic/crud-controller';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  constructor(private route: ActivatedRoute, private dialogRef: MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any,
            public router: Router) {}

  ngOnInit() {
  }

  confirmar() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

}
