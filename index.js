
let celda1 = document.getElementById('1');
let celda2 = document.getElementById('2');
let celda3 = document.getElementById('3');
let celda4 = document.getElementById('4');
let celda5 = document.getElementById('5');
let celda6 = document.getElementById('6');
let celda7 = document.getElementById('7');
let celda8 = document.getElementById('8');
let celda9 = document.getElementById('9');

celda1.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda2.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda3.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda4.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda5.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda6.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda7.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda8.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})

celda9.addEventListener('click', (e) => {
    e.target.value = "X"
    e.target.disabled = "true"
})


function juegaAI() {
    let cel1 = document.getElementById('1').value;
    let cel2 = document.getElementById('2').value;
    let cel3 = document.getElementById('3').value;
    let cel4 = document.getElementById('4').value;
    let cel5 = document.getElementById('5').value;
    let cel6 = document.getElementById('6').value;
    let cel7 = document.getElementById('7').value;
    let cel8 = document.getElementById('8').value;
    let cel9 = document.getElementById('9').value;

    const tablero = []

    switch (cel1) {
        case 'X':
            cel1 = 1
            tablero.push(cel1)

            break;
        case "":
            cel1 = 0
            tablero.push(cel1)

            break
        case 'O':
            cel1 = -1
            tablero.push(cel1)
    }

    switch (cel2) {
        case 'X':
            cel2 = 1
            tablero.push(cel2)

            break;
        case "":
            cel2 = 0
            tablero.push(cel2)

            break
        case 'O':
            cel2 = -1
            tablero.push(cel2)
    }

    switch (cel3) {
        case 'X':
            cel3 = 1
            tablero.push(cel3)

            break;
        case "":
            cel3 = 0
            tablero.push(cel3)

            break
        case 'O':
            cel3 = -1
            tablero.push(cel3)

    }

    switch (cel4) {
        case 'X':
            cel4 = 1
            tablero.push(cel4)

            break;
        case "":
            cel4 = 0
            tablero.push(cel4)

            break
        case 'O':
            cel4 = -1
            tablero.push(cel4)

    }

    switch (cel5) {
        case 'X':
            cel5 = 1
            tablero.push(cel5)

            break;
        case "":
            cel5 = 0
            tablero.push(cel5)

            break
        case 'O':
            cel5 = -1
            tablero.push(cel5)

    }

    switch (cel6) {
        case 'X':
            cel6 = 1
            tablero.push(cel6)

            break;
        case "":
            cel6 = 0
            tablero.push(cel6)

            break
        case 'O':
            cel6 = -1
            tablero.push(cel6)

    }

    switch (cel7) {
        case 'X':
            cel7 = 1
            tablero.push(cel7)

            break;
        case "":
            cel7 = 0
            tablero.push(cel7)

            break
        case 'O':
            cel7 = -1
            tablero.push(cel7)

    }

    switch (cel8) {
        case 'X':
            cel8 = 1
            tablero.push(cel8)

            break;
        case "":
            cel8 = 0
            tablero.push(cel8)

            break
        case 'O':
            cel8 = -1
            tablero.push(cel8)

    }

    switch (cel9) {
        case 'X':
            cel9 = 1
            tablero.push(cel9)

            break;
        case "":
            cel9 = 0
            tablero.push(cel9)

            break
        case 'O':
            //console.log(-1)
            cel9 = -1
            tablero.push(cel9)

    }
    //const tensor = arraigCeldas;
    //const tensorA = tf.tensor(arraigCeldas);

    predecir(tablero)
};


//*************************************************************************** */
const modelPath = "./model/model.ttf.json";

function predecir(arregloTomado) {

    console.log(arregloTomado)
    //Se evalua si termino el juego:
    const finJuego = finDelJuego(arregloTomado);

    if (finJuego) {
        document.getElementById("botonEntrenar").disabled = true;
        return
    }
    // tensortomado.print();

    tf.ready().then(() => {
        tf.tidy(() => {
            tf.loadLayersModel(modelPath).then((model) => {
                const tensor1 = tf.tensor(arregloTomado);
                const matches = tf.stack([tensor1]);;
                const result = model.predict(matches);
                const tensorReformat = result.reshape([1,9]);

                convertirEnArray(tensorReformat,arregloTomado);

                // Mostrar los resultados...
                //result.reshape([3, 3]).print();
            });
        });
    });
}

async function convertirEnArray(tensor,arregloTomado){
    const arreglo = await tensor.array();
    console.log(arreglo[0])

    const posicionMayor = encontrarPosicionMayor(arreglo[0]);
    //console.log("La posición del mayor número es:", posicionMayor);
    const posicionInput = posicionMayor+1;

    console.log(posicionInput.toString())

    //Se carga la posicion que eligio la AI:
    const celdaElegida = document.getElementById(posicionInput.toString());
    celdaElegida.value = 'O';
    celdaElegida.disabled = 'true';

    //
    const finJuego = finDelJuego(arregloTomado);

    if (finJuego) {
        document.getElementById("botonEntrenar").disabled = true;
        return
    }
    
}

function encontrarPosicionMayor(arr) {
    let max = arr[0];
    let maxIndex = 0;
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
        maxIndex = i;
      }
    }
    return maxIndex;
}

//fUNCION PARA DETERMINAR SI EL JUEGO TERMINO
function finDelJuego(array) {
    let pos1 = array[0];
    let pos2 = array[1];
    let pos3 = array[2];
    let pos4 = array[3];
    let pos5 = array[4];
    let pos6 = array[5];
    let pos7 = array[6];
    let pos8 = array[7];
    let pos9 = array[8];

    let alerta = document.getElementById("fin")

    if (pos1!=0 && pos1==pos2 && pos2==pos3) {
        let numGanador = pos1;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;
                break;
            case -1:
                alerta.innerText = "Fin del juego, gano -- O --";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    if (pos4!=0 && pos4==pos5 && pos5==pos6) {
        let numGanador = pos4;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;

                break;
            case -1:
                alerta.innerText = "Fin del juego, gano -- O --";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    if (pos7!=0 && pos7==pos8 && pos8==pos9) {
        let numGanador = pos7;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;

                break;
            case -1:
                alerta.innerText = "Fin del juego, gano -- O --";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    if (pos1!=0 && pos1==pos4 && pos4==pos7) {
        let numGanador = pos1;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;

                break;
            case -1:
                alerta.innerText = "Fin del juego, gano la IA";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    if (pos2!=0 && pos2==pos5 && pos5==pos8) {
        let numGanador = pos2;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;

                break;
            case -1:
                alerta.innerText = "Fin del juego, gano la IA";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    if (pos3!=0 && pos3==pos6 && pos6==pos9) {
        let numGanador = pos3;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;

                break;
            case -1:
                alerta.innerText = "Fin del juego, gano la IA";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    if (pos1!=0 && pos1==pos5 && pos5==pos9) {
        let numGanador = pos1;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;

                break;
            case -1:
                alerta.innerText = "Fin del juego, gano la IA";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    if (pos3!=0 && pos3==pos5 && pos5==pos7) {
        let numGanador = pos3;

        switch (numGanador) {
            case 1:
                alerta.innerText = "Fin del juego, gano el HUMANO!!";
                alerta.hidden = false;

                break;
            case -1:
                alerta.innerText = "Fin del juego, gano la IA";
                alerta.hidden = false;

                break;
        }
        return true;
    }

    return false;
}
