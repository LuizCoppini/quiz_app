import { StyleSheet, TouchableOpacity, Text } from "react-native";

export interface HomeBtnProps {
    text: string;
    disabled: boolean;
    onPress: () => void;
}

export default function HomeBtn({ text, disabled, onPress }: HomeBtnProps) {
    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabledButton]}
            onPress={disabled ? null : onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 60,
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    text: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'fungames',
    }
});
