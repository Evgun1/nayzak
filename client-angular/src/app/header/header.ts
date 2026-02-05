import { NgOptimizedImage, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderAction } from './components/header-action/header-action';
import { HeaderNavigation } from './components/header-navigation/header-navigation';
@Component({
  selector: 'app-header',
  imports: [HeaderAction, NgOptimizedImage, HeaderNavigation],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
