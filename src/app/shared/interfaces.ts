import { i18nPostprocess } from '@angular/core/src/render3';

export interface IPost {
    id: String,
    title: string,
    content: string,
    category: string,
    tag: string,
    image?: File
}

export type IPostList = [IPost]
