import { DefaultTheme, DarkTheme } from 'react-native-paper'
//Para saber mais: https://callstack.github.io/react-native-paper/theming.html
export const Light = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        primary: '#008631',
        accent: '#1FD655',
        background: '#83F28F',
        surface: '#F3F3F3',
        text: '#000000',
    }
}
export const Dark = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        primary: '#262626',
        accent: '#A7A6A6',
        background: '#000000',
        surface: '#363636',
        text: '#FFFFFF'
    }
}