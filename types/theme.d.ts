export type ThemeColors = {
    primary: string;
    secondary: string;
    background: string;
    card: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
};

export type FontSizes = {
    title: number;
    subtitle: number;
    body: number;
    small: number;
};

export type FontTypes = {
    regular: string;
    bold: string;
};

export type AppTheme = {
    Colors: ThemeColors;
    FontSizes: FontSizes;
    Fonts: FontTypes;
};
