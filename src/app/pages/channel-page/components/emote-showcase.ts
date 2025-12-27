import { KeyValuePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { EmoteType, type Emote } from '@api';
import { NgIcon } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmIconImports } from '@spartan-ng/helm/icon';

@Component({
  imports: [HlmAccordionImports, HlmIconImports, NgIcon, KeyValuePipe],
  selector: 'app-emote-showcase',
  template: `
    <hlm-accordion class="">
      @for (item of groupedEmotes() | keyvalue; track item.key) {
        @if (item.value.length) {
          <hlm-accordion-item>
            <h3 class="contents">
              <button hlmAccordionTrigger>
                {{ item.key }}
                <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
              </button>
            </h3>
            <hlm-accordion-content>
              <div class="flex flex-wrap items-center justify-center max-h-[50vh] overflow-y-auto">
                @for (emote of item.value; track emote.name) {
                  <div class="m-2">
                    @defer {
                      <img [src]="emote.link" alt="{{ emote.name }}" />
                    } @placeholder {
                      <p>Placeholder content</p>
                    }
                  </div>
                }
              </div>
            </hlm-accordion-content>
          </hlm-accordion-item>
        }
      }
    </hlm-accordion>
  `,
})
export class EmoteShowcaseComponent {
  emotes = input.required<Emote[]>();

  groupedEmotes = computed(() => {
    const emotes = this.emotes();
    const groupedEmotes: Record<EmoteType, Emote[]> = {
      [EmoteType.Seventvemote]: [],
      [EmoteType.Bttvemote]: [],
      [EmoteType.Ffzemote]: [],
      [EmoteType.Twitchemote]: [],
    };
    emotes.forEach((emote) => {
      groupedEmotes[emote.type].push(emote);
    });
    return groupedEmotes;
  });
}
