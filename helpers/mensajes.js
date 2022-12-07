//MENU DE INICIO DE PRUEBA, CON DATOS QUEMADOS.

const colors = require("colors");

const mostrarMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log(
      colors.green("=======================================================")
    );
    console.log(
      colors.white("                    MENU DE INICIO                     ")
    );
    console.log(
      colors.green("=======================================================\n")
    );

    console.log(`${colors.green("1.")} Crear tarea`);
    console.log(`${colors.green("2.")} Listar tareas`);
    console.log(`${colors.green("3.")} Listar tareas completadas`);
    console.log(`${colors.green("4.")} Listar tareas pendientes`);
    console.log(`${colors.green("5.")} Completar tarea(s)`);
    console.log(`${colors.green("6.")} Borrar tarea`);
    console.log(`${colors.green("0.")} SALIR \n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Seleccione una opción.", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve, reject) => {

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(
      `\nPresione ${colors.green("ENTER")} para continuar.\n`,
      (opt) => {
        readline.close();
        resolve();
      }
    );
  });
};

module.exports = {
  mostrarMenu,
  pause,
};
