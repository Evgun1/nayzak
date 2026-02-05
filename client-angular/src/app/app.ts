import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Sprite } from './ui/icons/sprite/sprite';

@Component({
    selector: 'app-root',
    imports: [CommonModule, Header, Footer, Sprite],
    templateUrl: './app.html',
    styleUrl: './app.scss',
    //   template: ` Welcome to Angular!!! `,
})
export class App {
    protected readonly title = signal('nayzak');
}
