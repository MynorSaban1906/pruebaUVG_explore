import react from "react";
import { Text, StyleSheet } from "react-native";


const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: 'white',
    },
    textTitle: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
    },
    textMission: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bodyText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },

})

export default function StyledText({ textTitle, textMission, bodyText, children }) {
    const textStyles = [
        styles.text,
        textTitle && styles.textTitle,
        textMission && styles.textMission,
        bodyText && styles.bodyText

    ]
    return (
        <Text style={textStyles}>
            {children}
        </Text>
    )
}

