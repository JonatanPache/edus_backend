const bayes = require('bayes');


// Introducir datos en el modelo
async function introducirDatosEnModelo(dato) {
    try {
        const network = new Netw;
        // Definir variables y nodos en el modelo
        const dificultadNode = new bayes.Node.Discrete('dificultad', ['facil', 'intermedia', 'dificil']);
        const respuestaNode = new bayes.Node.Discrete('respuesta', ['true', 'false']);
        network.addNode(dificultadNode);
        network.addNode(respuestaNode);
        // Añadir relaciones probabilísticas entre los nodos
        network.addArc('dificultad', 'respuesta');
        // Iterar sobre los datos y aprender a partir de ellos
        datos.forEach((dato) => {
            const { dificultad, respuesta } = dato;
            // Añadir evidencia al modelo
            network.evidence({ dificultad, respuesta });
            // Aprender de la evidencia
            network.learn();
        });
        // Guardar el modelo entrenado
        const modeloEntrenado = network.save();
        console.log('Modelo entrenado:', modeloEntrenado);
    } catch (error) {
        console.error('Error al introducir datos en el modelo:', error);
    }
}


async function introducirDatosEnModelo2(datos) {
    try {
        // Crear el modelo bayesiano
        const classifier = bayes();
        const categories = {
            facil: 1,
            intermedia: 0,
            dificil:2
        };
        datos.forEach((dato) => {
            const { dificultad, respuesta } = dato;
            classifier.learn(respuesta.toString(), categories[dificultad.toString()]);
        });
        // Realizar una predicción
        const prediction = classifier.categorize('true');
        return prediction;
        /*
        // Guardar el modelo entrenado
        const modeloEntrenado = classifier.toJson();
        console.log('Modelo entrenado:', modeloEntrenado);
        return modeloEntrenado;*/
    } catch (error) {
        console.error('Error al introducir datos en el modelo:', error);
    }
}
module.exports = {introducirDatosEnModelo, introducirDatosEnModelo2};