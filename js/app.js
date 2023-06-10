let ingresos = [
//   new Ingreso("Salario", 2100.0),
//   new Ingreso("Venta coche", 1500.0),
];

let egresos = [
//   new Egreso("Renta departamento", 900.0),
//   new Egreso("Ropa", 300.0),
];

const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();

  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  localStorage.setItem("egresos", JSON.stringify(egresos));
};

const totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso._valor;
  }
  return totalIngreso;
};

const totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso._valor;
  }
  return totalEgreso;
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-PE", {
    style: "percent",
    minimumFractionDigits: 1,
  });
};

const cargarCabecero = () => {
  const presupuesto = totalIngresos() - totalEgresos();
  const porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());

  localStorage.setItem("presupuesto", presupuesto);
  localStorage.setItem("porcentajeEgreso", porcentajeEgreso);
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso._descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso._valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarIngreso(${ingreso._id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
  return ingresoHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso._descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(egreso._valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(
              egreso._valor / totalEgresos()
            )}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarEgreso(${egreso._id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
  return egresoHTML;
};

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso._id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();

  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  //   localStorage.setItem("egresos", JSON.stringify(egresos));
};

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso._id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();

  //   localStorage.setItem("ingresos", JSON.stringify(ingresos));
  localStorage.setItem("egresos", JSON.stringify(egresos));
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const agregarDato = () => {
  const forma = document.forms["forma"];
  const tipo = forma["tipo"];
  const descripcion = forma["descripcion"];
  const valor = forma["valor"];

  if (descripcion.value !== "" && valor.value !== "") {
    if (tipo.value === "ingreso") {
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarIngresos();
      localStorage.setItem("ingresos", JSON.stringify(ingresos));
    } else if (tipo.value === "egreso") {
      egresos.push(new Egreso(descripcion.value, +valor.value));
      cargarCabecero();
      cargarEgresos();
      localStorage.setItem("egresos", JSON.stringify(egresos));
    }
  }

  limpiarCampos();
};

const limpiarCampos = () => {
  document.forms["forma"].reset();
};

const cargarDatosDesdeLocalStorage = () => {
  const ingresosGuardados = JSON.parse(localStorage.getItem("ingresos"));
  const egresosGuardados = JSON.parse(localStorage.getItem("egresos"));

  if (ingresosGuardados) {
    ingresos = ingresosGuardados;
  }

  if (egresosGuardados) {
    egresos = egresosGuardados;
  }
};

cargarDatosDesdeLocalStorage();
cargarApp();

console.log(ingresos, egresos);
