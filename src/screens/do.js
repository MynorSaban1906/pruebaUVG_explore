import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import Carousel from './carrusel';

const { height, width } = Dimensions.get('window');

const Do = ({ navigation }) => {
    const [showWelcome, setShowWelcome] = useState(false); 
    const scaleYellow = useSharedValue(1);
    const scaleBlue = useSharedValue(1);

    useEffect(() => {
        setTimeout(() => {
            scaleYellow.value = width / 20; // Escala inicial del círculo amarillo
            scaleBlue.value = width / 30; // Escala inicial del círculo azul
        }, 100); 
        
        setTimeout(() => {
            setShowWelcome(true);
            scaleYellow.value = width / 2; // Escala final del círculo amarillo
            scaleBlue.value = width / 2; // Escala final del círculo azul
        }, 2000); 

    }, []);

    const animatedStyleYellow = useAnimatedStyle(() => {
        return {
            transform: [{ scaleX: scaleYellow.value }, { scaleY: scaleYellow.value }],
            backgroundColor: 'yellow',
        };
    });

    const animatedStyleBlue = useAnimatedStyle(() => {
        return {
            transform: [{ scaleX: scaleBlue.value }, { scaleY: scaleBlue.value }],
            backgroundColor: 'blue',
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                {/* Círculo amarillo */}
                <Animated.View style={[styles.circle, animatedStyleYellow]} />
                {/* Círculo azul */}
                <Animated.View style={[styles.circle, animatedStyleBlue]} />
            </View>
            {showWelcome !== true ? (
                <Animated.Image
                    source={require('../../assets/Elementos_estáticos/LogoParaFondosClaros_ExploraxV2-0.png')}
                    style={styles.image}
                />
            ) : (
                <Carousel/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
    circleContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
    },
});

export default Do;
