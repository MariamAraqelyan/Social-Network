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
  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  getTestAccount(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe(): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap(res => this.me.set(res))
      )
  }

  getAccount(id: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/subscribers`)
      .pipe(
        map(res => res.items.slice(0,subsAmount))
      )
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile)
  }

  uploadPhoto(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<Profile>(`${this.baseApiUrl}account/upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageble<Profile>>(`${this.baseApiUrl}account/accounts`, {
      params
    }).pipe(
      tap(res => this.filteredProfiles.set(res.items))
    )
  }
}
