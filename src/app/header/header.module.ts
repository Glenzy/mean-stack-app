import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
    MatButtonModule,
} from '@angular/material';

import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule { }
