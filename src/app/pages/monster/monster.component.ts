import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { PlayingCardComponent } from "../../components/playing-card/playing-card.component";
import { Monster } from '../../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [ReactiveFormsModule, PlayingCardComponent, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelect, MatOption],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss'
})
export class MonsterComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private readonly dialog = inject(MatDialog);

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [100, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [10, [Validators.required, Validators.min(1), Validators.max(200)]],
    attackDescription: ['', [Validators.required]],
  });

  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterTypes = Object.values(MonsterType);
  monsterId = -1;

  private routeSubscription: Subscription | null = null;
  private formValuesSubscription: Subscription | null = null;

  ngOnInit(): void {

    this.formValuesSubscription = this.formGroup.valueChanges.subscribe(data => {
      this.monster = Object.assign(new Monster, data);
    });

    this.routeSubscription = this.route.params.subscribe(params => {
      this.monsterId = parseInt(params['id'] || -1);
      const monsterFound = this.monsterService.getId(this.monsterId);
      if (monsterFound) {
        this.monster = monsterFound;
        this.formGroup.patchValue(this.monster);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValuesSubscription?.unsubscribe();
  }

  previousMonster() {
    let previousId = this.monsterId || 0;
    previousId--;
    this.router.navigate(['/monster/', previousId]);
  }

  nextMonster() {
    let nextId = this.monsterId || 0;
    nextId++;
    this.router.navigate(['/monster/', nextId]);
  }

  navigateBack() {
    this.router.navigate(['/home']);
  }

  submit(event: Event) {
    event.preventDefault();
    console.log(this.monsterId);
    if (this.monsterId < 1) {
      this.monsterService.add(this.monster);
    } else {
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
  }

  deleteMonster() {
    const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);
      dialogRef.afterClosed().subscribe(confirmation => {
        if (confirmation) {
          this.monsterService.delete(this.monsterId);
          this.navigateBack();
        };
      });
  }

  isFieldInvalid(field: string) {
    const formControl = this.formGroup.get(field);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }
}
