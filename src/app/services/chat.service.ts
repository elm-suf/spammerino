import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User, type Badge } from '@api';
import { AppStore } from '../app.state';
import { ChatClient, type ChatMessage } from '@twurple/chat';
import { toast } from 'ngx-sonner';
import type { RenderMessage, RenderToken } from '../pages/channel-page/models/render-message.model';
const MAX_MESSAGES = 100;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  #store = inject(AppStore);
  emotes = this.#store.emotes;
  badges = this.#store.badges;
  private badgeMap = computed(() => new Map(this.badges().map((b) => [b.name, b])));
  private emoteMap = computed(() => new Map(this.emotes().map((e) => [e.name, e])));
  private msgs = signal<ChatMessage[]>([]);

  chatClient = new ChatClient();
  currentUser?: User;
  constructor() {
    this.chatClient.onConnect(() =>
      toast('Connected to chat', {
        description: `Channel: ${this.#store.selectedUser()?.name}`,
      })
    );

    this.chatClient.onPart((e) => {
      toast(`Left Chat`, {
        description: `Channel: ${e}`,
      });
      this.msgs.set([]);
    });
    this.chatClient.onMessage((_, __, ___, msg) => {
      this.msgs.update((curr) => {
        const next = [...curr, msg];
        return next.length > MAX_MESSAGES ? next.slice(-MAX_MESSAGES) : next;
      });
    });

    effect(() => {
      console.debug(`effect: ${this.#store.selectedUser()?.name}`);
      const selectedUser = this.#store.selectedUser();
      if (selectedUser) {
        if (this.currentUser) {
          this.chatClient.part(this.currentUser.name);
        }

        this.currentUser = selectedUser;
        this.chatClient.connect();
        this.chatClient.join(selectedUser.name);
      }
    });
  }

  renderMsgs = computed<RenderMessage[]>(() => this.msgs().map((msg) => this.toRenderMessage(msg)));

  private toRenderMessage(msg: ChatMessage): RenderMessage {
    return {
      id: msg.id,
      displayName: msg.userInfo.displayName,
      color: msg.userInfo.color,
      badges: this.resolveBadges(msg),
      tokens: this.tokenize(msg.text),
    };
  }
  private resolveBadges(msg: ChatMessage): Badge[] {
    if (!msg.userInfo.badges) return [];
    const map = this.badgeMap();
    const ret = msg.tags
      .get('badges')!
      .split(',')
      .map((id) => map.get(id))
      .filter(Boolean) as Badge[];

    return ret;
  }

  private tokenize(text: string): RenderToken[] {
    const emotes = this.emoteMap();
    const tokens: RenderToken[] = [];

    let buffer = '';

    for (const part of text.split(' ')) {
      const emote = emotes.get(part);
      if (emote) {
        if (buffer) {
          tokens.push({ kind: 'text', value: buffer });
          buffer = '';
        }
        tokens.push({ kind: 'emote', emote });
      } else {
        buffer += buffer ? ` ${part}` : part;
      }
    }

    // flush remaining text
    if (buffer) {
      tokens.push({ kind: 'text', value: buffer });
    }

    return tokens;
  }
}
