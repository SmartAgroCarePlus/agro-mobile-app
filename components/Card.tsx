import {View, Text, ViewStyle} from 'react-native'
import React from 'react'

interface CardProps{
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    variant?: 'default' | 'outlined' | 'elevated';
}

const Card = ({children, style, variant='default' }:CardProps) => {
    const getCardStyle = () => {
        switch (variant) {
            case 'outlined':
                return { borderWidth: 1, borderColor: '#E0E0E0', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0,
                    shadowRadius: 0,
                    elevation: 0, ...style,};
            case 'elevated':
                return { shadowColor: "rgba(0, 0, 0, 0.1)", shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 4,
                    ...style };
            default:
                return { shadowColor: "rgba(0, 0, 0, 0.1)",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2, ...style };
        }
    }
    return (
        <View className="bg-white rounded-lg p-4" style={getCardStyle()}>
            {children}
        </View>
    )
}

export default Card
