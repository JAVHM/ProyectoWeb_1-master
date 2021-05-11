//JUEGO - INSTALACION =========
const mensaje = document.querySelector("#Mensaje");
mensaje.innerText = "";
// 0.4 significa que tiene más probabilidades de ganar que 0.2
function getDistributions(){
    return get2Randoms([0.2, 0.4])
}
function get2Randoms(options){
    var r1 = Math.floor(Math.random() * options.length)
    var result1 = options.splice(r1, 1)
    var r2 = Math.floor(Math.random() * options.length)
    var result2 = options.splice(r2, 1)
    return [result1[0], result2[0]]
}
function apostarYJugar(maquina, apuesta){
    ///console.log("apostarYJugar => Ejecutar getResult, luego getWin")
    var resultado = getResult(maquina)
    var ganancia = getWin(resultado)
    return {
        resultado,
        ganancia
    }
}
var results = ['', '', 'JJ', 'QQ', 'KK', '', '', 'AA']//VolverlaGlobal
function getResult(p){
    ///console.log("Se ejecuta getResult");
    var rewards = []
    var sum = 0, maxRewards = 10, tries = 5;
    //var global va acá
    var r = getRewards(p, maxRewards)
    var result = results[ r < results.length ? r : 0 ]
    ///console.log("      getResult r: " + r);
    ///console.log("      getResult result: " + result);
    ///console.log("           si 'result' = nulo se ejecuta getResultNoReward() para obtener dos letras diferentes");
    if(result == ''){
        return getResultNoReward()
    }
    return result
}
function getRewards(p, max){
    var reward = 0
    for(var i = 0; i < max ; i++){
        reward += bernoulli(p)
    }
    return reward
}
function bernoulli(p){
    return 1 && ( Math.random() < p ) || 0 
}
function getResultNoReward(){
    return get2Randoms(['J', 'Q', 'K', 'A']).join('')
}
function getWin(result){
    ///console.log("Se ejecuta getWin")
    ///console.log("       Resultado de getResult: " + result)
    var results = {
        'JJ': 2, 'QQ': 3, 'KK': 4, 'AA': 10
    }
    var win = results[result]
    ///console.log("       Ganancia: " + win)
    ///console.log("       Si doble letra igual, dar su valor, caso contrario 0")
    return win || 0
}
function imprimirIntento(i, maquina, intento){
    console.log("Ejecutar imprimirIntento()")
    console.log('      Intento', i)
    console.log('      Maquina', maquina)
    console.log('      Resultado', intento.resultado,)
    console.log('      Ganancia', intento.ganancia, )
    console.log('      Ganancia total',intento.ganancia * apuesta)
    return intento.ganancia * apuesta
}
function debugResult(p, tries, maxRewards){
    console.log("Ejecutar debugResult()")
    var rewards = []
    var sum = 0
    for(var i = 0; i < tries ; i++){
        var r = getRewards(p, maxRewards)
        rewards.push(r)
        sum += r
    }
    //console.log(rewards, sum, sum/tries)
}

function M3839(){
    console.log("M3839")
    let temp = 0;
    for(let i=0; i < results.length; i++){
        if(intento.resultado == results[i]){
            temp += 1;
        }
    }
    if(temp != 0){
        setTimeout(() => {
            const frase = "Perdistes!"
            mensaje.innerText = frase;
            console.log("   Perdistes!")
        }, 6000)
    }else{
        setTimeout(() => {
            const frase = "GANASTES!"
            mensaje.innerText = frase;
            console.log("   GANASTES!")
        }, 6000)
    }
}
function M40(){
    console.log("M40 monto total: ")
    console.log("   ", montoTotal," - ",apuesta," + ", intento.ganancia * apuesta," = ",
    montoTotal = montoTotal + intento.ganancia * apuesta - apuesta)
    montoTotal = montoTotal - apuesta
    montoTotal = montoTotal + intento.ganancia * apuesta
}
//Funciona pero se imprime al final
function M41(time){
    console.log("M41")
    const sentence = intento.resultado;
    setTimeout(() => {
        var a = sentence.substr(0,1);
        const Slot1 = document.querySelector("#Slot1");
        M42(a,time,Slot1)
        setTimeout(() => {console.log("   letra 1:", a); Slot1.innerText = a;}, time);
        var b = sentence.substr(1,1);
        const Slot2 = document.querySelector("#Slot2");
        M42(a,time*2,Slot2)
        setTimeout(() => {console.log("   letra 2:", b); Slot1.innerText = b;}, time*2);}, 1500);
}
function M42(letter,time,slot){
    console.log("M42")
    for(let i = 1; i < time-10;i+=10)
    {
        setTimeout(() => {
            letters = ['J', 'Q', 'K', 'A']
            letter = letters[Math.floor(Math.random()*letters.length)]
            slot.innerText = letter; 
            console.log(letter)}
            , i);
    }
}
//INICIO
///Obtienes un número aleatorio y se lo asignas a una máquina
var distribuciones = getDistributions()
console.log(distribuciones)
var maquinas = {
    maquinaA: distribuciones[0],
    maquinaB: distribuciones[1]
}



/// JUGAR
//INTENTO 1
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 1
var maquina = 'maquinaA'
let apuesta = 10
let montoTotal = 100;
console.log("INTENTO " + i)
var intento = apostarYJugar(maquinas[maquina])
imprimirIntento(i, maquina, intento)//almacena el dinero apostado
M3839(); M40(); M41(2000);
debugResult(intento.maquina, intento.tries, intento.ganancia)
//imprimirIntento(nroIntento,Maquina usada,apostarYJugar(maquinas[maquina]))
/*
apuesta = 20;
console.log("Nueva apuesta: ", apuesta)
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)
debugResult(intento.maquina, intento.tries, intento.ganancia)
M3839(); M40()*/