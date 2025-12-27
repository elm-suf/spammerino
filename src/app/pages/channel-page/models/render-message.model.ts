import { Badge, Emote } from '@api';

export type RenderToken = { kind: 'text'; value: string } | { kind: 'emote'; emote: Emote };

export interface RenderMessage {
  id: string;
  color?: string;
  displayName: string;
  badges: Badge[];
  tokens: RenderToken[];
}
