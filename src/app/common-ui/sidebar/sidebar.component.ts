import { AsyncPipe, JsonPipe, NgForOf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    ImgUrlPipe,
    SubscriberCardComponent,
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me

  menuItems = [
    {
      id: 1,
      label: 'home',
      url: ''
    },
    {
      id: 2,
      label: 'Message',
      url: 'Message'
    },
    {
      id: 3,
      label: 'Search',
      url: 'search'
    },
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe())
  }
}
