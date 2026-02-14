import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        palette: {
            primary: {
                main: string;
                white: string;
                black: string;
            };
            error: {
                main: string;
            };
            background: {
                default: string;
            };
        };
        custom: {
            borderRadius: string;
            boxShadow: string;
            error: string;
            text: {
                primary: string;
                secondary: string;
                placeholder: string;
                addressColorLightGray: string;
                borderColor: string;
                black: string;
            };
            gray: {
                100: string;
                200: string;
                300: string;
                400: string;
                500: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            brand: {
                400: string;
            };
            neutral: {
                50: string;
                200: string;
            };
            button: {
                primaryDisabledColor: string;
                primaryDisabledBackground: string;
                secondaryDisabledColor: string;
                secondaryDisabledBackground: string;
            };
            header: {
                background: string;
            };
            background: {
                primary: string;
                secondary: string;
            };
            proxyBadge: {
                pure: string;
                multi: string;
            };
            identity: {
                green: string;
                grey: string;
                red: string;
            };
        };
    }
    interface ThemeOptions {
        custom: {
            boxShadow: string;
            error: string;
            text: {
                primary: string;
                secondary: string;
                placeholder: string;
                addressColorLightGray: string;
                borderColor: string;
                black: string;
            };
            gray: {
                100: string;
                200: string;
                300: string;
                400: string;
                500: string;
                600: string;
                700: string;
                800: string;
                900: string;
            };
            brand: {
                400: string;
            };
            neutral: {
                50: string;
                200: string;
            };
            button: {
                primaryDisabledColor: string;
                primaryDisabledBackground: string;
                secondaryDisabledColor: string;
                secondaryDisabledBackground: string;
            };
            header: {
                background: string;
            };
            background: {
                primary: string;
                secondary: string;
            };
            proxyBadge: {
                pure: string;
                multi: string;
            };
            identity: {
                green: string;
                grey: string;
                red: string;
            };
        };
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4964a8',
            white: 'white',
            black: '#000000de',
        },
        error: {
            main: '#ff8a65',
        },
        background: {
            default: '#FAFCFD',
        },
    },
    typography: {
        fontFamily: ['Jost', 'sans-serif', 'Roboto'].join(','),
    },
    custom: {
        borderRadius: '0.75rem',
        boxShadow:
            '0 1.21622px 2.43243px rgba(0, 0, 0, 0.1), 0 1.21622px 3.64865px rgba(0, 0, 0, 0.25)',
        error: '#ff8a65',
        text: {
            primary: '#334155',
            secondary: '#64748B',
            placeholder: '#83878B',
            addressColorLightGray: '#777575',
            borderColor: '#E0E2E8',
            black: '#18191A',
        },
        gray: {
            100: '#FFFFFF',
            200: '#FAFCFD',
            300: '#F1F5F9',
            400: '#E6ECF1',
            500: '#C6CDE0',
            600: '#94A3B8',
            700: '#64748B',
            800: '#485568',
            900: '#020617',
        },
        neutral: {
            50: '#FAFAFA',
            200: '#e5e5e5',
        },
        brand: {
            400: '#4C66AA',
        },
        button: {
            primaryDisabledColor: '#A8B3DC',
            primaryDisabledBackground: '#E3E9FF',
            secondaryDisabledColor: '#D7D7D7',
            secondaryDisabledBackground: '#F1F5F9',
        },
        header: {
            background: '#fff',
        },
        background: {
            primary: '#F1F5F9',
            secondary: '#F8FAFC',
        },
        proxyBadge: {
            pure: '#4C66AA',
            multi: '#F1F5F9',
        },
        identity: {
            green: 'green',
            grey: 'grey',
            red: 'firebrick',
        },
    },
} as Omit<ThemeOptions, 'components'>);
