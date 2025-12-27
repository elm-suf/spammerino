import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@api';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { AppStore } from './app.state';
import { CommandDialog } from './components/command-dialog';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';
import { ChannelPageComponent } from './pages/channel-page/channel-page';
import { ChatService } from './services/chat.service';

export type Views = 'aside' | 'main' | 'chat';
@Component({
  selector: 'app-root',
  host: {
    class: 'flex flex-col h-screen overflow-hidden',
  },
  imports: [
    HeaderComponent,
    CommandDialog,
    FooterComponent,
    NgTemplateOutlet,
    HlmToasterImports,
    ChannelPageComponent,
  ],
  template: `
    <app-header>
      <div class="hidden md:block">
        <ng-container *ngTemplateOutlet="command"></ng-container>
      </div>
    </app-header>

    <main class="flex-1 overflow-hidden">
      @if(selectedUser(); as user){
      <app-channel-page
        [channel]="user"
        [emotes]="emotes()"
        [msgs]="msgs()"
        [mobileView]="mobileView()"
      />
      }
    </main>
    <app-footer class="md:hidden" [(mobileView)]="mobileView">
      <ng-container *ngTemplateOutlet="command"></ng-container>
    </app-footer>

    <!-- end template -->
    <ng-template #command>
      <app-command-dialog
        [users]="users()"
        [isLoading]="isLoading()"
        [query]="query()"
        (searchEvent)="handleSearch($event)"
        (selectEvent)="handleSelect($event)"
      />
    </ng-template>
    <hlm-toaster />
  `,
})
export class App {
  #store = inject(AppStore);
  #chatService = inject(ChatService);
  msgs = this.#chatService.renderMsgs;

  router = inject(Router);
  route = inject(ActivatedRoute);

  selectedUser = this.#store.selectedUser;
  users = this.#store.users;
  emotes = this.#store.emotes;
  badges = this.#store.badges;
  isLoading = this.#store.isLoading;
  query = this.#store.query;

  mobileView = signal<Views>('chat');

  handleSearch(query: string) {
    this.#store.setQuery(query);
  }
  handleSelect(user: User) {
    this.router.navigate([`/${user.name}`]);
  }
}
