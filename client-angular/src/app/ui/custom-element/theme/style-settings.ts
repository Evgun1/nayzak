import { Injectable } from '@angular/core';
import {
    Color,
    Fill,
    Roundness,
    Size,
    State,
    StyleSettingsType,
    Type,
} from './style-settings.type';

@Injectable({
    providedIn: 'root',
})
export class StyleSettings {
    generateClasses(config: StyleSettingsType) {
        const { color, type, size, roundness, fill, state } = config;

        let btnColor;
        const classes: string[] = [];

        if (type === 'DEFAULT' || type === 'SQUARE') {
            color === 'DARK' ? (btnColor = Color.DARK_DEFAULT) : (btnColor = Color.LIGHT_DEFAULT);
        }
        if (type === 'TEXT') {
            color === 'DARK' ? (btnColor = Color.DARK_TEXT) : (btnColor = Color.LIGHT_TEXT);
        }
        if (type === 'UNDERLINE') {
            color === 'DARK'
                ? (btnColor = Color.DARK_UNDERLINE)
                : (btnColor = Color.LIGHT_UNDERLINE);
        }

        if (size && Size[size]) classes.push(Size[size]);
        if (roundness && Roundness[roundness]) classes.push(Roundness[roundness]);
        if (fill && Fill[fill]) classes.push(Fill[fill]);
        if (type && Type[type]) classes.push(Type[type]);
        if (btnColor) classes.push(btnColor);
        if (state && state.length > 0) for (const element of state) classes.push(State[element]);

        return classes;
    }
}
