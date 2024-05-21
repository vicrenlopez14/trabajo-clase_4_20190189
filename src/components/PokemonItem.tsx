import React, {useState, useEffect, memo} from 'react';
import {View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, ActivityIndicator} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 3;

const getPokemonInfo = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
}

const PokemonItem = ({item}: { item: any }) => {
    const [pokemonInfo, setPokemonInfo] = useState<any>(null);

    useEffect(() => {
        getPokemonInfo(item.url).then((info) => {
            setPokemonInfo(info);
        });
    }, []);


    return <View style={styles.card}>
        <Image
            style={styles.image}
            source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}}
        />
        <Text style={styles.title}>Número pokedex: {item.id}</Text>
        <Text style={styles.title}>{item.name}</Text>
        <Text>Tipo: {pokemonInfo?.types.map((type: any) => type.type.name).join(', ')}</Text>
        <Text>Altura: {pokemonInfo?.height}</Text>
        <Text>Peso: {pokemonInfo?.weight}</Text>
        <View style={
            {
                width: '100%',
                padding: 10,
            }
        }>
            <Text>Altura: {pokemonInfo?.height}</Text>
            <Text>Peso: {pokemonInfo?.weight}</Text>
        </View>
        <Text>Habilidades: {pokemonInfo?.abilities.map((ability: any) => ability.ability.name).join(', ')}</Text>
    </View>
}

export default PokemonItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    list: {
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        margin: 5,
        width: WIDTH / numColumns - 10,
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        textTransform: 'capitalize',
    },
    image: {
        width: 80,
        height: 80,
    },
    loading: {
        marginTop: 20,
    },
});
