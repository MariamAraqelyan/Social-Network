import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../data/services/profile.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent {

  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchForm.valueChanges
    .pipe(
      startWith({}),
      debounceTime(300),
      switchMap((formValue) => {
        return this.profileService.filterProfiles(formValue);
      }),
      takeUntilDestroyed()
    )
    .subscribe()
  }

}
