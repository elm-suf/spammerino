import { Component, input, output, signal } from '@angular/core';
import { User } from '@api';
import { provideIcons } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideCog,
  lucideLayers,
  lucidePlus,
  lucideSearch,
  lucideSearchCheck,
  lucideSmile,
  lucideUser,
  lucideX,
} from '@ng-icons/lucide';
import { BrnCommandImports } from '@spartan-ng/brain/command';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmCode } from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-command-dialog',
  imports: [
    BrnCommandImports,
    HlmCommandImports,
    HlmIconImports,
    HlmButtonImports,
    BrnDialogImports,
    HlmDialogImports,
    HlmCode,
  ],
  providers: [
    provideIcons({
      lucideX,
      lucideCalendar,
      lucideSmile,
      lucidePlus,
      lucideUser,
      lucideLayers,
      lucideCog,
      lucideSearch,
      lucideSearchCheck,
    }),
  ],

  template: `
    <div class="flex flex-row items-center justify-center gap-1">
      <button class="p-2" hlmBtn variant="ghost" size="sm" (click)="state.set('open')">
        <ng-icon
          name="{{ state() === 'open' ? 'lucideSearchCheck' : 'lucideSearch' }}"
          class=" cursor-pointer hover:scale-110 transition-transform duration-300"
          [class.rotate-360]="state() === 'open'"
        />
      </button>
      <p class="hidden md:block">Press <code hlmCode>⌘ + Shift + K</code></p>
    </div>

    <hlm-dialog [state]="state()">
      <hlm-command *brnDialogContent="let ctx" hlmCommandDialog class="mx-auto sm:w-[400px]">
        <hlm-command-search>
          <ng-icon hlm name="lucideSearch" />
          <input
            placeholder="Type channel name to search"
            hlm-command-search-input
            (input)="handleSearch($event.target.value)"
          />
          <button hlmCommandDialogCloseBtn>
            <ng-icon hlm name="lucideX" />
          </button>
        </hlm-command-search>

        <div *brnCommandEmpty hlmCommandEmpty>No results found.</div>
        <hlm-command-list hlm>
          <hlm-command-group label="Results">
            @for (channel of users(); track $index) {

            <button hlm-command-item [value]="channel.name" (selected)="handleSelect(channel)">
              <img
                [src]="channel.profilePictureUrl"
                alt="Profile image"
                class="size-8 rounded-full"
              />
              {{ channel.displayName }}
            </button>
            <hlm-command-separator hlm />
            }
          </hlm-command-group>
        </hlm-command-list>
      </hlm-command>
    </hlm-dialog>
  `,
  host: {
    '(window:keydown)': 'onKeyDown($event)',
  },
})
export class CommandDialog {
  public readonly state = signal<'closed' | 'open'>('closed');

  onKeyDown(event: KeyboardEvent) {
    if (
      (event.metaKey || event.ctrlKey) &&
      event.shiftKey &&
      (event.key === 'k' || event.key === 'K')
    ) {
      this.state.set('open');
    }
  }
  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  users = input.required<User[]>();
  isLoading = input.required<boolean>();
  query = input.required<string>();
  searchEvent = output<string>();
  selectEvent = output<User>();

  handleSearch(query: string): void {
    this.searchEvent.emit(query);
  }

  handleSelect(user: User): void {
    this.stateChanged('closed');
    this.selectEvent.emit(user);
  }
}
