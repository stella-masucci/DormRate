import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagesPage } from './messages.page';

import { MessagesPageRoutingModule } from './messages-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MessagesPageRoutingModule
  ],
  declarations: [MessagesPage]
})
export class MessagesPageModule {}
