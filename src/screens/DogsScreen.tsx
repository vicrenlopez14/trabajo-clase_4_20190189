import {View, Text, ScrollView} from "react-native";
import {useEffect, useState} from "react";

const api = "https://dogapi.dog/api/v2/breeds"


const getRazas = async () => {
    const requestOptions: any = {
        method: "GET",
        redirect: "follow"
    };

    const response = await fetch("https://dogapi.dog/api/v2/breeds", requestOptions);
    const result = await response.json();

    console.log(result.data)

    //     Extract the data from the response
    return result.data;
}


const mostrarRazas = async () => {
    const razas = await getRazas();
    const razasList = []

    razas.forEach((raza) => {
        razasList.push({
            name: raza.attributes.name,
            description: raza.attributes.description,
            maxLife: raza.attributes.life.max
        })
    });

    return razasList

}

export const DogsScreen = () => {
    const [dogs, setDogs] = useState<any>(null);

    useEffect(() => {
        mostrarRazas().then((data) => {
            setDogs(data)
        })
    }, []);


    return (
        <View>
            <Text style={{
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center"

            }}>Dogs API</Text>
           <ScrollView>
               {dogs && dogs.map((dog: any) => (
                   <View key={dog.name} style={{
                       backgroundColor: "lightblue",
                       margin: 10,
                       padding: 10
                   }}>
                       <Text style={{
                           fontSize: 20,
                           fontWeight: "bold"
                       }}>Nombre: {dog.name}</Text>
                       <Text style={{
                           fontSize: 15,
                           fontStyle: "italic"
                       }}>Edad máxima:{dog.maxLife}</Text>
                       <Text style={{
                           fontSize: 15,
                           fontStyle: "italic"
                       }}>Descripción: {dog.description}</Text>
                   </View>
               ))}
           </ScrollView>


        </View>
    )
}