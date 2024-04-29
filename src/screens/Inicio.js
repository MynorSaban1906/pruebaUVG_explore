import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, Alert, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import LottieView from 'lottie-react-native';
import StyledText from '../components/StyledText';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    withRepeat,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import Encabezado from '../components/encabezado';
const { height, width } = Dimensions.get('window');

const duration = 2000;

const playSound = async () => {
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../../assets/Sonidos/Asteroide.wav'));
        await soundObject.playAsync();
    } catch (error) {
        console.error('Error al reproducir el sonido:', error);
    }
};

const Inicio = ({ navigation }) => {

    playSound();


    const defaultAnim = useSharedValue(100);
    const linear = useSharedValue(2000);

    const animatedDefault = useAnimatedStyle(() => ({
        transform: [{ translateX: defaultAnim.value }],
      
    }));


    React.useEffect(() => {
        linear.value = withRepeat(
            withTiming(-linear.value, {
                duration,
                easing: Easing.linear,
            }),
            -1,
            true
        );
        defaultAnim.value = withRepeat(
            withTiming(-defaultAnim.value, {
                duration,
            }),
            -1,
            true
        );
    }, []);


    return (
        <View style={styles.containerT}>
            <ImageBackground source={require('../../assets/Elementos_estáticos/Fondo_RutaIterg_720x1600px_ExploraxV2-0.png')} style={{ width: '100%', height: '100%' }}>

                <Encabezado/>

                <Animated.View style={[animatedDefault]}>
                    <LottieView
                        source={require('../../assets/Animaciones/D_con_fuego.json')}
                        autoPlay
                        loop
                        style={{ position: 'absolute', left: '-10%', width: '90%', zIndex: 1 }}
                    />
                </Animated.View>



                <View style={styles.container}>
                    <View style={styles.background} />
                    <View style={styles.content}>
                        <StyledText textTitle>¡Desafíate!</StyledText>
                        <StyledText bodyText> Supera este desafío y empieza a completar las misiones</StyledText>
                        <StyledText textMission>Jerarquia de operaciones</StyledText>



                    </View>
                    <Button style={styles.btnStar}
                        title="¡ACEPTO EL RETO!"
                        onPress={() => navigation.navigate('Dos')}

                    />
                </View>

                <Image
                    source={require('../../assets/Elementos_estáticos/Chanín.png')}
                    style={styles.image}
                    resizeMode="contain" 
                />

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    ovalado: {
        width: width - 220,
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 200,
        position: 'absolute',
        top: -70,
        transform: [
            { scaleX: 3 }
        ]
    },
    textBtn: {
        textAlign: "center",
        position: 'relative',
        left: -20,
        color: '#fff',
        fontSize: 20,
        fontWeight: '500'
    },
    circleIcon: {
        backgroundColor: '#fff',
        borderRadius: 50,
        margin: 10,
        position: 'relative',
        fontSize: 20,
        padding: 20,
        left: -40
    },
    btnStar: {
        flexDirection: 'row',
        marginTop: 40,
        alignItems: "center",
        paddingHorizontal: 40,
        borderRadius: 40,
        zIndex: 1
    },
    meta: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 30
    },
    description: {
        padding: 40,
        height,
        alignItems: "center",
        backgroundColor: 'white',
        position: 'relative',
        top: 220
    },
    containerT: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#123051',

    },
    image: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '30%',
    },
    background: {
        position: 'absolute',
        backgroundColor: '#204D8D',
        shadowColor: '#123051',
        borderRadius: 15,
        width: '90%',
        height: '35%',
        margin: '10%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',


    },
    content: {
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationColor: 'purple',
    },
    missionTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    bodyText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    animation: {
        width: 125,
        height: 125,
        position: 'absolute',
        top: 70,
        left: '50%',
        marginLeft: -62.5,

    },
    button: {
        borderRadius: 10,
    },
});


export default Inicio;
