import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import Constants from 'expo-constants';

import Carousel from './carrusel';

const { width } = Dimensions.get('window');

const Dos = ({ navigation }) => {
    const [showWelcome, setShowWelcome] = useState(false); 
    const scaleYellow = useSharedValue(1);
    const scaleBlue = useSharedValue(1);
    const scaleImage = useSharedValue(1);

    useEffect(() => {
        scaleYellow.value = withTiming(width / 2, { duration: 2000 });
        scaleBlue.value = withTiming(width / 2, { duration: 2000 });
        scaleImage.value = withTiming(1.5, { duration: 1000 });

        setTimeout(() => {
            setShowWelcome(true);
        }, 500); 

    }, []);

    const animatedStyleYellow = useAnimatedStyle(() => {
        return {
            transform: [{ scaleX: scaleYellow.value }, { scaleY: scaleYellow.value }],
            backgroundColor: 'yellow',
            opacity: showWelcome ? 0: 1, 
        };
    });

    const animatedStyleBlue = useAnimatedStyle(() => {
        return {
            transform: [{ scaleX: scaleBlue.value }, { scaleY: scaleBlue.value }],
            backgroundColor: 'blue',
            opacity: showWelcome ? 0 : 1, 
        };
    });

    const animatedStyleImage = useAnimatedStyle(() => {
        return {
            transform: [{ scaleX: scaleImage.value }, { scaleY: scaleImage.value }],
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.circleContainer}>
                {/* Círculo amarillo */}
                <Animated.View style={[styles.circle, animatedStyleYellow]} />
                {/* Círculo azul */}
                <Animated.View style={[styles.circle, animatedStyleBlue]} />
                <Animated.Image
                    source={require('../../assets/Elementos_estáticos/LogoParaFondosClaros_ExploraxV2-0.png')}
                    style={[styles.image, animatedStyleImage]}
                />
            </View>
            {showWelcome && (
                <Carousel />
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
    circleContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
    },
    image: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
    },
});

export default Dos;
