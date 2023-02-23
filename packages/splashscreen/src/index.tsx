/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/tslint/config */
import { BrowserWindow, systemPreferences, ipcMain } from 'electron';
export { default as reportReady } from './report-ready';
export { default as Office } from './template';

export interface IProps {
    mainWindow: any;
    color?: unknown;
    icon?: string;
    width?: number;
    height?: number;
    url?: unknown;
    image?: unknown;
    brand?: unknown;
    productName?: unknown;
    logo?: unknown;
    website?: unknown;
    text?: string;
    backgroundColor?: string;
}
export const initSplashScreen = ({
    mainWindow,
    color,
    width = 600,
    height = 400,
    url,
    image,
    brand,
    productName,
    logo,
    website,
    text,
    backgroundColor,
    icon = undefined,
}: IProps) => {
    const col =
        color ||
        (systemPreferences.getAccentColor &&
            `#${systemPreferences.getAccentColor()}`);
    // @ts-ignore
    global['splashScreenImage'] = image || icon;

    const splashScreen = new BrowserWindow({
        width,
        height,
        parent: mainWindow,
        modal: true,
        transparent: true,
        skipTaskbar: true,
        frame: false,
        autoHideMenuBar: true,
        alwaysOnTop: true,
        resizable: false,
        movable: false,
        icon,
        backgroundColor
    });

    const args = {
        brand: brand,
        productName: productName,
        logo: logo,
        website: website,
        color: col,
        text: text
    };
    if (typeof url === 'function') {
        const file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(url(args));
        splashScreen.loadURL(file);
    } else {
        splashScreen.loadURL(
            url + '#' + Buffer.from(JSON.stringify(args)).toString()
        );
    }
    splashScreen.show();
    const hide = () => {
        setTimeout(() => splashScreen.destroy(), 500);
        // mainWindow.show();
    };
    ipcMain.on('ready', hide);
    return hide;
};
