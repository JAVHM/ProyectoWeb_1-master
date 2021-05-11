//JUEGO - INSTALACION =========

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
    console.log("apostarYJugar => Ejecutar getResult, luego getWin")
    var resultado = getResult(maquina)//2.1.1
    var ganancia = getWin(resultado)//2.1.2
    return {
        resultado,
        ganancia
    }
}
function getResult(p){
    console.log("Se ejecuta getResult");
    var rewards = []
    var sum = 0, maxRewards = 10, tries = 5;
    var results = ['', '', 'JJ', 'QQ', 'KK', '', '', 'AA']
    var r = getRewards(p, maxRewards)
    var result = results[ r < results.length ? r : 0 ]
    console.log("      getResult r: " + r);
    console.log("      getResult result: " + result);
    console.log("           si 'result' = nulo se ejecuta getResultNoReward() para obtener dos letras diferentes");
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
    console.log("Se ejecuta getWin")
    console.log("       Resultado de getResult: " + result)
    var results = {
        'JJ': 2, 'QQ': 3, 'KK': 4, 'AA': 10
    }
    var win = results[result]
    console.log("       Ganancia: " + win)
    console.log("       Si doble letra igual, dar su valor, caso contrario 0")
    return win || 0
}
function imprimirIntento(i, maquina, intento){
    console.log("Ejecutar imprimirIntento()")
    console.log(
        '      ',
        i + '-',
        maquina + ':', 
        intento.resultado, 
        intento.ganancia, 
        intento.ganancia * apuesta
   ) 
   M38(intento)
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
    console.log(rewards, sum, sum/tries)
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
var apuesta = 10
console.log("INTENTO " + i)
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)
debugResult(intento.maquina, intento.tries, intento.ganancia)
//imprimirIntento(nroIntento,Maquina usada,apostarYJugar(maquinas[maquina]))


//INTENTO 2
//PRESIONAR EL BOTON DE UNA MAQUINA
var i = 2
var maquina = 'maquinaB'
var apuesta = 10
console.log("\n\n  INTENTO " + i)
var intento = apostarYJugar(maquinas[maquina]) 
imprimirIntento(i, maquina, intento)