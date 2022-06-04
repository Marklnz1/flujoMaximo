class FlujoMaximo {
  gestorNodos;
  nodosRuta;
  pesosRuta;
  pasos;
  pasoActual = null;
  nodosRutaAux = null;
  constructor(gestorNodos) {
    this.gestorNodos = gestorNodos;
    this.nodosRuta = [];
    this.pasos = [];
    this.pesosRuta = [];
    this.nodosRutaAux = [];
  }

  calcularFlujoMaximo(nodoInicial, nodoFinal) {
    if (nodoInicial == null || nodoFinal == null) return;
    this.pasos.length = 0;
    let flujoMaximo = 0;
    let contadorPasos = 0;
    let resp = {pesoMenor:0,pesosRuta:[]};
    while (resp != null) {
      flujoMaximo += parseInt(resp.pesoMenor);
      
      this.pesosRuta = resp.pesosRuta;
      this.pasos.push(this.generarPaso(contadorPasos++,resp.pesoMenor));
      GESTOR_NODOS.resetearColor();
      resp = this.calcularFlujoRuta(nodoInicial, nodoFinal);
        
    }

    GESTOR_NODOS.resetearColor();
    let ultimoPaso = this.pasos[this.pasos.length-1];
    ultimoPaso.estadosColorEnlaces = GESTOR_NODOS.generarEstadosColorEnlaces();
    ultimoPaso.estadosColorNodos = GESTOR_NODOS.generarEstadosColorNodos();
    let textoFlujoMaximo = "FLUJO MAXIMO = ";
    for(let i= 0; i < this.pasos.length-1;i++){
        textoFlujoMaximo+=this.pasos[i].minimo.split("=")[1].trim();
        if(i==this.pasos.length-2){
            break;
        }
        textoFlujoMaximo+="+";
    }
    textoFlujoMaximo+=" = "+flujoMaximo;
    ultimoPaso.ruta = textoFlujoMaximo;
    ultimoPaso.minimo = "";
    this.cargarPaso(ultimoPaso);
 
  }
  generarPaso(n,peso) {
    let estadosColorEnlaces = GESTOR_NODOS.generarEstadosColorEnlaces();
    let estadosColorNodos = GESTOR_NODOS.generarEstadosColorNodos();
    let estadosDatosEnlaces = GESTOR_NODOS.generarEstadosDatosEnlaces();

    let paso = {};
    if (n > 0) {
      this.pasos[n - 1].estadosColorEnlaces = estadosColorEnlaces;
      this.pasos[n - 1].estadosColorNodos = estadosColorNodos;
      let ruta = "RUTA => ";
    for(let i = this.nodosRuta.length-1; i >=0;i--){
        let nr = this.nodosRuta[i];
        ruta+=nr.getNombre();
        if(i==0)break;
        ruta+=",";


    }
    this.pasos[n - 1].ruta = ruta;
    let minimo = "MIN(";
    for(let i= this.pesosRuta.length-1; i >=0; i--){
        minimo+=this.pesosRuta[i];
        if(i==0){
         minimo+=") = "+peso;
            break;
        }
        minimo+=","
    }    
    this.pasos[n - 1].minimo = minimo;

}
    paso.estadosDatosEnlaces = estadosDatosEnlaces;
    paso.numero = n;
    

    return paso;
   
  }
  cargarPasoSiguiente() {
    if(this.pasos.length==0 )return;
    if(this.pasoActual==null){
        this.pasoActual = this.pasos[this.pasos.length-1];
    }
      let numeroSiguiente = this.pasoActual.numero + 1 ;
    if (numeroSiguiente >= this.pasos.length){
        numeroSiguiente = numeroSiguiente-1;
    }

    let paso = this.pasos[numeroSiguiente];
    this.cargarPaso(paso);
  }
  cargarPasoAnterior() {
    if(this.pasos.length==0 )return;
    if(this.pasoActual==null){
        this.pasoActual = this.pasos[this.pasos.length-1];
    }
    let numeroAnterior = this.pasoActual.numero - 1;
    if (numeroAnterior < 0 ){
        numeroAnterior = 0;
    }

    let paso = this.pasos[numeroAnterior];

    this.cargarPaso(paso);
  }
  cargarPaso(paso) {
    if (paso == null) return;
    this.pasoActual = paso;
    
    let textoPaso = document.querySelector(".titulo_pasos");
    textoPaso.innerHTML = "PASO "+(this.pasoActual.numero+1);
    if(this.pasoActual.numero==this.pasos.length-1){
        textoPaso.innerHTML = "RESULTADO FINAL";
    }
    let { estadosDatosEnlaces, estadosColorEnlaces, estadosColorNodos } = paso;

    for (let ee of estadosDatosEnlaces) {
      let enlace = GESTOR_NODOS.getEnlaceID(ee.id);
      if (enlace == null) continue;
      enlace.setTexto1(ee.texto1);
      enlace.setTexto2(ee.texto2);
      // enlace.setColor(ee.color);
    }

    if (estadosColorNodos != null) {
      for (let en of estadosColorNodos) {
        let nodo = GESTOR_NODOS.getNodoID(en.id);
        if (nodo == null) continue;
        nodo.setColor(en.color);
      }
    }
    if (estadosColorEnlaces != null) {
      for (let ee of estadosColorEnlaces) {
        let enlace = GESTOR_NODOS.getEnlaceID(ee.id);
        if (enlace == null) continue;
        enlace.setColor(ee.color);
      }
    }

       let rutaInterfaz = document.querySelector(".ruta");
    let minimoInterfaz = document.querySelector(".minimo");
    rutaInterfaz.innerHTML = paso.ruta;
    minimoInterfaz.innerHTML = paso.minimo;
  }
  cargarPasoInicial() {
    if (this.pasos.length == 0) return;
    this.cargarPaso(this.pasos[0]);
  }
  calcularFlujoRuta(nodoInicial, nodoFinal) {
    this.nodosRuta.length = 0;
    this.pesosRuta.length = 0;
    this.nodosRutaAux.length = 0;
    // nodoInicial.setColor("#eb1717");
    for (let e of GESTOR_NODOS.enlaces) {
      e.visitado = false;
    }
    let enlaces = GESTOR_NODOS.getEnlacesNodo(nodoInicial);
    this.nodosRutaAux.push(nodoInicial);
    let nodoRuta = this.buscarRuta(
      nodoInicial,
      nodoInicial,
      nodoFinal,
      enlaces
    );
    if (nodoRuta) {
      this.nodosRuta.push(nodoRuta);
      this.nodosRuta.push(nodoInicial);
    } else {
      return null;
    }
    for(let nr of this.nodosRuta){
        nr.setColor("red");
    }
    let {pesoMenor,pesosRuta} = this.calcularPesoMenor(this.nodosRuta);
    // for (let nr of this.nodosRuta) {
    //   console.log(nr.getNombre() + " ");
    // }
    this.restarPesoMenor(this.nodosRuta, pesoMenor);
    return {pesoMenor,pesosRuta};
  }
  buscarRuta(nodoOrigen, nodoInicial, nodoFinal, enlaces) {
    let nodoEnlazado = null;
    for (let e of enlaces) {
      if (e.visitado ||this.enlaceInvalidoParaRuta(nodoOrigen, e)){
        continue;
      } 
     
     
      nodoEnlazado = e.getNodo1().getID() == nodoOrigen.getID() ? e.getNodo2() : e.getNodo1();
      if(this.existeNodoEnRuta(nodoEnlazado)){
          continue;
      }
      e.visitado = true;
      e.setColor("red");

      if (nodoEnlazado.getID() == nodoFinal.getID()) {
        return nodoEnlazado;
      }
      if (nodoEnlazado.getID() == nodoInicial.getID()) {
        e.visitado = false;
        e.setColor("gray");
        continue;
      }
      let nuevosEnlaces = GESTOR_NODOS.getEnlacesNodo(nodoEnlazado);
      this.nodosRutaAux.push(nodoEnlazado);

      let nodoRuta = this.buscarRuta(
        nodoEnlazado,
        nodoInicial,
        nodoFinal,
        nuevosEnlaces
      );
      if (nodoRuta) {
        this.nodosRuta.push(nodoRuta);
        return nodoEnlazado;
      } else {
        e.visitado = false;
        e.setColor("gray");
        removerItemDeArray(nodoEnlazado,this.nodosRutaAux);
      }
    }

    return null;
  }
  existeNodoEnRuta(nodo){
    for(let nr of this.nodosRutaAux){
        if(nr.getID()==nodo.getID()){
            return true;
        }
    }
    return false;
  }
  restarPesoMenor(nodosRuta, pesoMenor) {
    for (let i = 0; i < nodosRuta.length - 1; i++) {
      let enlace = GESTOR_NODOS.getEnlace(nodosRuta[i], nodosRuta[i + 1]);
      let peso1 = parseInt(enlace.getTexto1());
      let peso2 = parseInt(enlace.getTexto2());
      if (nodosRuta[i].getID() == enlace.getNodo1().getID()) {
        peso1 += pesoMenor;
        peso2 -= pesoMenor;
      } else {
        peso1 -= pesoMenor;
        peso2 += pesoMenor;
      }
      enlace.setTexto1(peso1 + "");
      enlace.setTexto2(peso2 + "");
    }
  }
  calcularPesoMenor(nodosRuta) {
    let pesoMenor = Number.MAX_SAFE_INTEGER;
    let pesosRuta = [];
    for (let i = 0; i < nodosRuta.length - 1; i++) {
      let enlace = GESTOR_NODOS.getEnlace(nodosRuta[i], nodosRuta[i + 1]);
      let pesoAnalisis = enlace.getTexto1();
        
      if (nodosRuta[i].getID() == enlace.getNodo1().getID()) {
        pesoAnalisis = enlace.getTexto2();
      }
      pesosRuta.push(pesoAnalisis);
      pesoAnalisis = parseInt(pesoAnalisis);
      if (pesoAnalisis < pesoMenor) {
        pesoMenor = pesoAnalisis;
      }
    }
    return {pesoMenor,pesosRuta};
  }

  enlaceInvalidoParaRuta(nodoOrigen, enlace) {
    return (
      (enlace.getNodo1().getID() == nodoOrigen.getID() && enlace.getTexto1() == "0") ||
      (enlace.getNodo2().getID() == nodoOrigen.getID() && enlace.getTexto2() == "0")
    );
  }
}
