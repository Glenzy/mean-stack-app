import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule
} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../shared/auth-interceptor';

import { PostsComponent } from './posts.component';
import { PostListComponent } from './postList/postlist.component';
import { AppRoutingModule } from "../app-router.module";

@NgModule({
    declarations: [
        PostsComponent,
        PostListComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatExpansionModule,
    ],
    exports: [PostsComponent],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class PostsModule { }
