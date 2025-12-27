import { Component, input } from '@angular/core';
import { hlmH3 } from '@spartan-ng/helm/typography';
import type { User } from '@api';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';

@Component({
  imports: [HlmAvatarImports],
  selector: 'app-user-card',
  template: ` <section class="flex-1 overflow-y-auto">
    <div class="flex gap-4 items-center p-4">
      <hlm-avatar variant="large" class="size-16">
        <img [src]="user().profilePictureUrl" [alt]="user().description" hlmAvatarImage />
        <span class="bg-[#FD005B] text-white" hlmAvatarFallback>RG</span>
      </hlm-avatar>
      <h3 class="${hlmH3}">{{ user().displayName }}</h3>
    </div>
  </section>`,
})
export class UserCardComponent {
  user = input.required<User>();
}
