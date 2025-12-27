import { Component, input, model, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideMessageSquareMore,
  lucideSearch,
  lucideCircleUserRound,
  lucidePenBox,
} from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import type { Views } from '../app';

@Component({
  selector: 'app-footer',
  template: ` <footer class="flex justify-between p-4 px-8">
    <button class="p-2" hlmBtn variant="ghost" size="sm" (click)="mobileView.set('aside')">
      <ng-icon name="lucideCircleUserRound" class="transition-transform duration-500" />
    </button>
    <button class="p-2" hlmBtn variant="ghost" size="sm" (click)="mobileView.set('main')">
      <ng-icon name="lucidePenBox" class="transition-transform duration-500" />
    </button>
    <button class="p-2" hlmBtn variant="ghost" size="sm" (click)="mobileView.set('chat')">
      <ng-icon name="lucideMessageSquareMore" class="transition-transform duration-500" />
    </button>
    <ng-content></ng-content>
  </footer>`,
  imports: [HlmButtonImports, NgIcon, HlmIconImports],
  providers: [
    provideIcons({ lucideMessageSquareMore, lucideSearch, lucideCircleUserRound, lucidePenBox }),
  ],
})
export class FooterComponent {
  mobileView = model.required<Views>();
}
