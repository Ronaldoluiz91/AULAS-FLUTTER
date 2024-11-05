// assets/styles/styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
    },
    button: {
        marginTop: 20,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default styles;