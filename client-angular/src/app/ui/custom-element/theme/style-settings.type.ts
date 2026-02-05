import { ButtonClassList } from '../../../../types/buttonClassList.enum';

export enum Color {
    DARK_DEFAULT = 'color__default-dark',
    LIGHT_DEFAULT = 'color__default-light',
    DARK_TEXT = 'color__text-dark',
    LIGHT_TEXT = 'color__text-light',
    DARK_UNDERLINE = 'color__underline-dark',
    LIGHT_UNDERLINE = 'color__underline-light',
}
export enum Size {
    X_LARGE = `size--xl ${ButtonClassList.BUTTON_X_LARGE}`,
    LARGE = `size--l ${ButtonClassList.BUTTON_LARGE}`,
    MEDIUM = `size--m ${ButtonClassList.BUTTON_MEDIUM}`,
    SMALL = `size--s ${ButtonClassList.BUTTON_SMALL}`,
    X_SMALL = `size--xs ${ButtonClassList.BUTTON_X_SMALL}`,
}
export enum Roundness {
    PILL = 'roundness--pill',
    ROUNDED = 'roundness--rounded',
    SHARP = 'roundness--sharp',
}
export enum Fill {
    OUTLINE = 'fill--outline',
    SOLID = 'fill--solid',
}
export enum Type {
    DEFAULT = 'type--default',
    SQUARE = 'type--square',
    TEXT = 'type--text',
    UNDERLINE = 'type--underline',
}
export enum State {
    HOVER = 'state--hover',
    DISABLE = 'state--disable',
}

export type StyleSettingsType  = {
    size?: keyof typeof Size;
    roundness?: keyof typeof Roundness;
    fill?: keyof typeof Fill;
    type?: keyof typeof Type;
    color?: 'DARK' | 'LIGHT';
    state?: Array<keyof typeof State>;
    // icon?: {
    //     left?: keyof typeof IconsIdList;
    //     right?: keyof typeof IconsIdList;
    // };
};
