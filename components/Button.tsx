import {View, Text, ButtonProps, TouchableOpacity, ActivityIndicator, TextStyle, ViewStyle, TouchableOpacityProps, ScrollView} from 'react-native'
import React from 'react'
import Colors from '@/constants/colors';
import {theme} from '@/constants/theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "outline";
    size?: "small" | "medium" | "large";
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}


const Button = ({title, onPress, variant = "primary",
                    size = "medium",
                    loading = false,
                    disabled = false,
                    style,
                    textStyle,
                    icon,
                    ...rest}: ButtonProps) => {

    const getBackgroundColor = () => {
        if (disabled) return "#666666";

        switch (variant) {
            case "primary":
                return "#4CAF50";
            case "secondary":
                return "#81D4FA";
            case "outline":
                return "transparent";
            default:
                return "#4CAF50";
        }
    };

    const getBorderColor = () => {
        if (disabled) return "#666666";

        switch (variant) {
            case "outline":
                return "#4CAF50";
            default:
                return "transparent";
        }
    };

    const getTextColor = () => {
        if (disabled) return Colors.background;

        switch (variant) {
            case "primary":
            case "secondary":
                return Colors.background;
            case "outline":
                return Colors.primary;
            default:
                return Colors.background;
        }
    };

    const getPadding = () => {
        switch (size) {
            case "small":
                return { paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.md };
            case "medium":
                return { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.lg };
            case "large":
                return { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl };
            default:
                return { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.lg };
        }
    };


    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                {
                    backgroundColor: getBackgroundColor(),
                    borderColor: getBorderColor(),
                    borderWidth: variant === "outline" ? 1 : 0,
                },
                getPadding(),
                style,
            ]}
            activeOpacity={0.8}
            {...rest}
            className="rounded-md flex flex-row items-center justify-center font-poppins-medium"
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} size="small" />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text
                        style={[
                            {
                                color: getTextColor(),
                                marginLeft: icon ? theme.spacing.sm : 0,
                            },
                            textStyle,
                        ]}
                        className="text-xl font-poppins"
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    )
}
export default Button
