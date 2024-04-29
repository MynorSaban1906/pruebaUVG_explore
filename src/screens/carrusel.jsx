import React, { useState, useEffect, useRef } from 'react';
import { FlatList, Text, View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, StatusBar, Image } from 'react-native';
import Constants from 'expo-constants';
import Encabezado from '../components/encabezado';
import { datosCarousel } from '../data/data';
import StyledText from '../components/StyledText';
import AnimatedLottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Audio } from 'expo-av';

const { width: screenWidth } = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;

const playSound = async (value) => {
    try {
        const soundObject = new Audio.Sound();
        if (value) {
            await soundObject.loadAsync(require('../../assets/Sonidos/RespuestaCorrecta.mp3'));
        } else {
            await soundObject.loadAsync(require('../../assets/Sonidos/RespuestaIncorrecta.mp3'));
        }
        await soundObject.playAsync();
    } catch (error) {
        console.error('Error al reproducir el sonido:', error);
    }
};


const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(Array(datosCarousel.length).fill(null));
    const [buttonsEnabled, setButtonsEnabled] = useState(Array(datosCarousel.length).fill(true));
    const [showAnimation, setShowAnimation] = useState(false);
    const [score, setScore] = useState(0);
    const [isLastSlide, setIsLastSlide] = useState(false); // Mover la declaración aquí



    const flatListRef = useRef(null);


    const statusBarHeight = Constants.statusBarHeight;

   
    const goToNextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % datosCarousel.length);
    };


const handleSeleccionTexto = (texto, respuestaCorrecta, index) => {
    const isCorrect = texto === respuestaCorrecta;
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = { option: texto, isCorrect };
    setSelectedOptions(updatedOptions);
    setShowAnimation(isCorrect);
    const updatedButtons = [...buttonsEnabled];
    updatedButtons[index] = false;
    setButtonsEnabled(updatedButtons);
    if (!isCorrect) {
        // Mostrar la respuesta correcta
        const correctIndex = item.resolve1 === item.btn1 ? 0 :
                            item.resolve1 === item.btn2 ? 1 :
                            item.resolve1 === item.btn3 ? 2 :
                            item.resolve1 === item.btn4 ? 3 : -1;
        const updatedOptionsWithCorrect = [...updatedOptions];
        updatedOptionsWithCorrect[index] = { option: item.resolve1, isCorrect: true };
        setSelectedOptions(updatedOptionsWithCorrect);
    }
    if (isCorrect) {
        playSound(true);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 2000);
        setScore(prevScore => prevScore + 1);
        goToNextItem();
    } else {
        playSound(false);
    }
};

    const handleNextSlide = () => {

        goToNextItem();
    };

    const renderSlide = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.innerContainer}>
                    <View style={styles.containerAnswer}>
                        <Text style={[styles.textoSlide]}>
                            {item.operation}
                            <Image
                                source={require('../../assets/Elementos_estáticos/QuestionMark.png')}
                                style={styles.imageQuestion}
                            />
                        </Text>
                    </View>

                    <View style={{ width: '90%', backgroundColor: '#204D8D', padding: 10, borderRadius: 20 }}>
                        <StyledText textMission>{item.details}</StyledText>
                        {showAnimation && (<AnimatedLottieView
                            source={require('../../assets/Animaciones/Estrellitas.json')}
                            autoPlay
                            loop
                            style={{ position: 'absolute', left: '-10%', width: '90%', zIndex: 1 }}
                        />)}
                    </View>

                    <View style={styles.botonesContainer}>
                        <TouchableOpacity
                            style={[
                                styles.boton,
                                selectedOptions[index]?.option === item.btn1 && selectedOptions[index]?.isCorrect ? { backgroundColor: '#4CAF50' } :
                                    selectedOptions[index]?.option === item.btn1 ? { backgroundColor: '#FF0000' } :
                                        null
                            ]}
                            onPress={() => handleSeleccionTexto(item.btn1, item.resolve1, index)}
                            disabled={!buttonsEnabled[index]}
                        >
                            <Text style={styles.textoBoton}>{item.btn1}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.boton,
                                selectedOptions[index]?.option === item.btn2 && selectedOptions[index]?.isCorrect ? { backgroundColor: '#4CAF50' } :
                                    selectedOptions[index]?.option === item.btn2 ? { backgroundColor: '#FF0000' } :
                                        null
                            ]}
                            onPress={() => handleSeleccionTexto(item.btn2, item.resolve1, index)}
                            disabled={!buttonsEnabled[index]}
                        >
                            <Text style={styles.textoBoton}>{item.btn2}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.botonesContainer}>
                        <TouchableOpacity
                            style={[
                                styles.boton,
                                selectedOptions[index]?.option === item.btn3 && selectedOptions[index]?.isCorrect ? { backgroundColor: '#4CAF50' } :
                                    selectedOptions[index]?.option === item.btn3 ? { backgroundColor: '#FF0000' } :
                                        null
                            ]}
                            onPress={() => handleSeleccionTexto(item.btn3, item.resolve1, index)}
                            disabled={!buttonsEnabled[index]}
                        >
                            <Text style={styles.textoBoton}>{item.btn3}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.boton,
                                selectedOptions[index]?.option === item.btn4 && selectedOptions[index]?.isCorrect ? { backgroundColor: '#4CAF50' } :
                                    selectedOptions[index]?.option === item.btn4 ? { backgroundColor: '#FF0000' } :
                                        null
                            ]}
                            onPress={() => handleSeleccionTexto(item.btn4, item.resolve1, index)}
                            disabled={!buttonsEnabled[index]}
                        >
                            <Text style={styles.textoBoton}>{item.btn4}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    useEffect(() => {
        setIsLastSlide(currentIndex === datosCarousel.length - 1);
    }, [currentIndex]);

    return (
        <View style={[styles.container, { paddingTop: statusBarHeight }]}>
        <StatusBar translucent backgroundColor="transparent" />
        <ImageBackground source={require('../../assets/Elementos_estáticos/Fondo_RutaIterg_720x1600px_ExploraxV2-0.png')} style={{ width: '100%', height: '100%' }}>

            <Encabezado />
            <FlatList
                ref={flatListRef}
                data={datosCarousel}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                keyExtractor={(item) => item.id}
                renderItem={renderSlide}
                onScrollToIndexFailed={() => { }}
                getItemLayout={(data, index) => ({
                    length: screenWidth,
                    offset: screenWidth * index,
                    index,
                })}
                initialScrollIndex={0}
            />
            <View style={styles.pagination}>
                {isLastSlide && (
                    <TouchableOpacity onPress={handleNavigateToNextPage}>
                        <StyledText textMission>Ir a la siguiente página</StyledText>
                    </TouchableOpacity>
                )}
                <Text>  PUNTEO  {score} </Text>
                <StyledText textMission>{' > > > >'} Desliza {'< < < <'}</StyledText>

            </View>

        </ImageBackground>

    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    nextButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#6AB1B5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    innerContainer: {
        width: screenWidth,
        alignItems: 'center',
    },
    containerAnswer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: '#8D8D8D',
        shadowOpacity: 0.5,
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        borderRadius: 20,
        width: '90%',
        height: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },

    imageQuestion: {
        alignSelf: 'auto',
        width: 30,
        height: 30,
        marginRight: 20,
        marginLeft: 100,
        resizeMode: 'contain',

    },
    slide: {
        width: screenWidth,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoSlide: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#133362'
    },
    botonesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    boton: {
        backgroundColor: '#6AB1B5',
        shadowColor: '#448B8C',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowRadius: 4,
        width: 150,
        height: 40,
        marginLeft: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textoBoton: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },

});

export default Carousel;
