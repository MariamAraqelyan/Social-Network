import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Pageble } from '../interfaces/pageble.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http: HttpClient = inject(HttpClient);
  baseApiUrl: string = environment.apiUrl;

  // me!: Profile;
  me = signal<Profile | null>(null)

  getTestAccount(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      )
  }

  getSubscribersShortList() {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers`)
      .pipe(
        map(res => res.items.slice(0,3))
      )
  }
}
