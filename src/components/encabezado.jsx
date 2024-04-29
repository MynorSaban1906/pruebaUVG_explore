import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import StyledText from '../components/StyledText';

const Encabezado = () => {
    return (
        <View style={styles.topContainer}>
            <Image
                source={require('../../assets/Elementos_estáticos/PlanetaAritmética.png')}
                style={styles.imagePlanet}
            />
            <Image
                source={require('../../assets/Elementos_estáticos/pantalla_puntos/Moneda.png')}
                style={styles.imageCoin}
            />
            <StyledText bodyText style={styles.text}>
                0001
            </StyledText>
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 0,
        alignItems: 'center', 
        flexDirection: 'row',
    },
    imagePlanet: {
        width: 80,
        height: 80,
        top: 10,
        marginRight: 10, // Agrega un margen a la derecha para separar las imágenes
    },
    imageCoin: {
        width: 40,
        height: 40,
        marginLeft:120,
        marginRight: 10, // Agrega un margen a la derecha para separar las imágenes
    },
    text: {
        marginLeft: 'auto', // Coloca el texto al lado derecho del contenedor
    },
});

export default Encabezado;
