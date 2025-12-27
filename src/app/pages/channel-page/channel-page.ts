import { Component, input, signal, ViewChild, type ElementRef } from '@angular/core';
import { User, type Emote } from '@api';
import { ChatMessageComponent } from './components/chat-message';
import { useAutoScroll } from './hooks/use-auto-scroll';
import type { RenderMessage } from './models/render-message.model';
import { UserCardComponent } from './components/user-card';
import { EmoteShowcaseComponent } from './components/emote-showcase';
import { useMobileBreakpoint } from './hooks/use-mobile-breakpoint';
import type { Views } from '../../app';

@Component({
  selector: 'app-channel-page',
  imports: [ChatMessageComponent, UserCardComponent, EmoteShowcaseComponent],
  host: {
    class: 'flex flex-col h-full ',
  },
  template: `
    @let selectedView = isMobile() ? mobileView() : null;
    <section
      class="h-full border-2
    md:grid grid-cols-[300px_auto_340px] grid-rows-1 gap-2
    
    "
    >
      <nav [class.hidden]="selectedView && selectedView !== 'aside'">
        <app-user-card [user]="channel()" />
        <app-emote-showcase [emotes]="emotes()" />
      </nav>

      <main [class.hidden]="selectedView && selectedView !== 'main'">main content</main>

      <aside
        class="py-2 flex flex-col h-full min-h-0 overflow-hidden"
        [class.hidden]="selectedView && selectedView !== 'chat'"
      >
        <ul
          class="chat-container flex flex-col overflow-y-auto flex-1"
          #scrollContainer
          (scroll)="autoScroll.onScroll()"
          (mouseleave)="autoScroll.onMouseLeave()"
          (mouseenter)="autoScroll.onMouseEnter()"
        >
          @for (msg of msgs(); track msg.id) {
          <app-chat-message [msg]="msg"></app-chat-message>
          }
        </ul>
      </aside>
    </section>
  `,
})
export class ChannelPageComponent {
  channel = input.required<User>();
  emotes = input.required<Emote[]>();
  msgs = input.required<RenderMessage[]>();

  mobileView = input.required<Views>();
  isMobile = useMobileBreakpoint();

  private scrollRef = signal<ElementRef<HTMLDivElement> | undefined>(undefined);
  @ViewChild('scrollContainer')
  set scroll(el: ElementRef<HTMLDivElement>) {
    this.scrollRef.set(el);
  }
  autoScroll = useAutoScroll(this.scrollRef, this.msgs);
}
