import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

function CustomButton({ title, handlePress, containerStyle, textStyles, isLoading }) {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={
                `bg-secondary rounded-xl min-h-[62px] 
                justify-center items-center ${containerStyle} 
                ${isLoading ? 'opacity-50' : ''}`}
                disabled={isLoading}>
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton