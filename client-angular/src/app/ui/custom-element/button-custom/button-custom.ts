import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { get } from 'http';
import { StyleSettingsType } from '../theme/style-settings.type';
import { StyleSettings } from '../theme/style-settings';
import { NgClass } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
    selector: 'app-button-custom',
    imports: [NgClass],
    templateUrl: './button-custom.html',
    styleUrl: './button-custom.scss',
})
export class ButtonCustom {
    @Input() label: string = 'Button';
    @Input() styleSettings: StyleSettingsType = {};
    @Output() click = new EventEmitter<any>();

    constructor(private readonly styleSettingsService: StyleSettings) {}

    onClick(event: any) {
        this.click.emit(event);
    }

    get styleSettingsClass() {
        return this.styleSettingsService.generateClasses(this.styleSettings);
    }
}
