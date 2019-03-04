import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from "../app-router.module";
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
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [HeaderComponent]
})
export class HeaderModule { }
