import { Component, input } from '@angular/core';
import type { RenderMessage } from '../models/render-message.model';

@Component({
  selector: 'app-chat-message',
  imports: [],
  template: `
    <!-- template for chat message -->
    <li class="block leading-snug px-[20px] py-[5px] border">
      <!-- badges -->
      @if (msg().badges.length) {
      <span class="chat-user-badge-list inline-flex items-center gap-1 align-middle">
        @for (badge of msg().badges; track badge.name) {
        <img class="inline-block align-text-bottom" [src]="badge.link" [alt]="badge.name" />
        }
      </span>
      }
      <!-- username -->
      <span class="font-bold whitespace-nowrap align-middle" [style.color]="msg().color">
        {{ msg().displayName }}:
      </span>

      <!-- message body -->
      @for (token of msg().tokens; track $index) { @if (token.kind === 'emote') {
      <img
        class="inline-block align-middle"
        [src]="token.emote.link"
        [alt]="token.emote.name"
        loading="lazy"
      />
      } @else {
      <span class="align-middle "> {{ token.value }} </span>
      } }
    </li>
  `,
})
export class ChatMessageComponent {
  msg = input.required<RenderMessage>();
}
