import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { User } from '@api';
import { AppStore } from './app.state';
import { CommandDialog } from './components/command-dialog';
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  host: {
    class: 'flex flex-col min-h-screen',
  },
  imports: [HeaderComponent, CommandDialog, FooterComponent, NgTemplateOutlet, RouterOutlet],
  template: `
    <app-header>
      <div class="hidden md:block">
        <ng-container *ngTemplateOutlet="command"></ng-container>
      </div>
    </app-header>

    <main class="flex-1 grid place-items-center">
      <router-outlet />
    </main>

    <app-footer class="md:hidden">
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
  `,
})
export class App {
  #store = inject(AppStore);
  router = inject(Router);
  route = inject(ActivatedRoute);

  selectedUser = this.#store.selectedUser;
  users = this.#store.users;
  emotes = this.#store.emotes;
  badges = this.#store.badges;
  isLoading = this.#store.isLoading;
  query = this.#store.query;

  handleSearch(query: string) {
    this.#store.setQuery(query);
  }
  handleSelect(user: User) {
    this.router.navigate([`/${user.name}`]);
  }
}
