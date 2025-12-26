import { Component, inject, OnInit } from '@angular/core';
import { hlmMuted, hlmSmall } from '@spartan-ng/helm/typography';
import { ThemeService } from '../services/theme.service';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { AsyncPipe } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';

@Component({
  selector: 'app-header',
  providers: [provideIcons({ lucideSun, lucideMoon })],
  imports: [HlmIconImports, AsyncPipe],
  template: `<header class="flex border justify-between align-center p-2">
    <div class="flex flex-col items-end  pr-8">
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight ">spammerino</h1>
      <h2 class="${hlmMuted}">in the browserino</h2>
    </div>

    <div class="flex items-center justify-center gap-2">
      <ng-content></ng-content>

      @let isDark = (theme$ | async) === 'dark';
      <ng-icon
        (click)="toggleTheme()"
        name="{{ isDark ? 'lucideSun' : 'lucideMoon' }}"
        class="transition-transform duration-500"
        [class.rotate-180]="isDark"
      />
    </div>
  </header>`,
})
export class HeaderComponent {
  private _themeService = inject(ThemeService);
  public theme$ = this._themeService.theme$;
  public toggleTheme(): void {
    this._themeService.toggleDarkMode();
  }
}
