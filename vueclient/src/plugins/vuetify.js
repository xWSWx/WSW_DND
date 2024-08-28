// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'; // Ensure you are using css-loader
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const WSWTheme = {
    dark: true,
    colors: {
        primary: '#FF5722', // Deep Orange
        secondary: '#3F51B5', // Indigo
        accent: '#CDDC39', // Lime
        error: '#F44336', // Red
        info: '#00BCD4', // Cyan
        success: '#8BC34A', // Light Green
        warning: '#FFEB3B', // Yellow
        //background: '#bd7204'
    },
};

const WSWLight = {
    light: true,
    colors: {
        primary: '#8B4F26',
        surfaceTint: '#8B4F26',
        onPrimary: '#FFFFFF',
        primaryContainer: '#FFDBC8',
        onPrimaryContainer: '#321300',
        secondary: '#765847',
        onSecondary: '#FFFFFF',
        secondaryContainer: '#FFDBC8',
        onSecondaryContainer: '#2B1709',
        tertiary: '#616033',
        onTertiary: '#FFFFFF',
        tertiaryContainer: '#E8E5AC',
        onTertiaryContainer: '#1D1D00',
        error: '#BA1A1A',
        onError: '#FFFFFF',
        errorContainer: '#FFDAD6',
        onErrorContainer: '#410002',
        background: '#FFF8F5',
        onBackground: '#221A15',
        surface: '#FFF8F5',
        onSurface: '#221A15',
        surfaceVariant: '#F4DED3',
        onSurfaceVariant: '#52443C',
        outline: '#85746B',
        outlineVariant: '#D7C2B8',
        shadow: '#000000',
        scrim: '#000000',
        inverseSurface: '#382E29',
        inverseOnSurface: '#FFEDE5',
        inversePrimary: '#FFB68A',
        primaryFixed: '#FFDBC8',
        onPrimaryFixed: '#321300',
        primaryFixedDim: '#FFB68A',
        onPrimaryFixedVariant: '#6F3811',
        secondaryFixed: '#FFDBC8',
        onSecondaryFixed: '#2B1709',
        secondaryFixedDim: '#E5BFA9',
        onSecondaryFixedVariant: '#5C4131',
        tertiaryFixed: '#E8E5AC',
        onTertiaryFixed: '#1D1D00',
        tertiaryFixedDim: '#CBC992',
        onTertiaryFixedVariant: '#49491E',
        surfaceDim: '#E7D7CF',
        surfaceBright: '#FFF8F5',
        surfaceContainerLowest: '#FFFFFF',
        surfaceContainerLow: '#FFF1EA',
        surfaceContainer: '#FCEAE2',
        surfaceContainerHigh: '#F6E5DD',
        surfaceContainerHighest: '#F0DFD7'
    },
}

const WSWdark = {
    dark: true,
    colors: {
        primary: '#FFB68A',
        surfaceTint: '#FFB68A',
        onPrimary: '#522300',
        primaryContainer: '#6F3811',
        onPrimaryContainer: '#FFDBC8',
        secondary: '#E5BFA9',
        onSecondary: '#432B1C',
        secondaryContainer: '#5C4131',
        onSecondaryContainer: '#FFDBC8',
        tertiary: '#CBC992',
        onTertiary: '#333209',
        tertiaryContainer: '#49491E',
        onTertiaryContainer: '#E8E5AC',
        error: '#FFB4AB',
        onError: '#690005',
        errorContainer: '#93000A',
        onErrorContainer: '#FFDAD6',
        background: '#1A120D',
        onBackground: '#F0DFD7',
        surface: '#1A120D',
        onSurface: '#F0DFD7',
        surfaceVariant: '#52443C',
        onSurfaceVariant: '#D7C2B8',
        outline: '#9F8D84',
        outlineVariant: '#52443C',
        shadow: '#000000',
        scrim: '#000000',
        inverseSurface: '#F0DFD7',
        inverseOnSurface: '#382E29',
        inversePrimary: '#8B4F26',
        primaryFixed: '#FFDBC8',
        onPrimaryFixed: '#321300',
        primaryFixedDim: '#FFB68A',
        onPrimaryFixedVariant: '#6F3811',
        secondaryFixed: '#FFDBC8',
        onSecondaryFixed: '#2B1709',
        secondaryFixedDim: '#E5BFA9',
        onSecondaryFixedVariant: '#5C4131',
        tertiaryFixed: '#E8E5AC',
        onTertiaryFixed: '#1D1D00',
        tertiaryFixedDim: '#CBC992',
        onTertiaryFixedVariant: '#49491E',
        surfaceDim: '#1A120D',
        surfaceBright: '#413732',
        surfaceContainerLowest: '#140D08',
        surfaceContainerLow: '#221A15',
        surfaceContainer: '#261E19',
        surfaceContainerHigh: '#312823',
        surfaceContainerHighest: '#3D332D'
    },
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#1976D2',
                    secondary: '#424242',
                    accent: '#82B1FF',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FFC107',
                },
            },
            dark: {
                dark: true,
                colors: {
                    primary: '#2196F3',
                    secondary: '#424242',
                    accent: '#FF4081',
                    error: '#FF5252',
                    info: '#2196F3',
                    success: '#4CAF50',
                    warning: '#FB8C00',
                },
            },
            WSWTheme,
            WSWLight,
            WSWdark,
            // Add more themes as needed
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        /*sets: {
            mdi,
        },*/
    },
});
export default vuetify;