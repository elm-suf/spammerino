import { Routes } from '@angular/router';
import { ChannelPageComponent } from './pages/channel-page/channel-page';

export const routes: Routes = [
  {
    path: ':channelName',
    component: ChannelPageComponent,
  },
];
