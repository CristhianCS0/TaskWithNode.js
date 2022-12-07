const inquirer = require("inquirer");
const colors = require("colors");

const menuOpt = [
    {
        type: "list",
        name: "option",
        message: "¿Que desea hacer?",
        choices: [
            {
                value: "1",
                name: `${colors.green("1.")} Crear tarea`,
            },
            {
                value: "2",
                name: `${colors.green("2.")} Listar tareas`,
            },
            {
                value: "3",
                name: `${colors.green("3.")} Listar tareas completadas`,
            },
            {
                value: "4",
                name: `${colors.green("4.")} Listar tareas pendientes`,
            },
            {
                value: "5",
                name: `${colors.green("5.")} Completar tareas`,
            },
            {
                value: "6",
                name: `${colors.green("6.")} Borrar tarea`,
            },
            {
                value: "0",
                name: `${colors.green("0.")} SALIR`,
            },
        ],
    },
];

const inquiererMenu = async () => {
    console.clear();
    console.log(colors.green("=========================================="));
    console.log(colors.green("              MENU DE INICIO              "));
    console.log(colors.green("=========================================="));

    const { option } = await inquirer.prompt(menuOpt);

    return option;
};

const pause = async () => {
    const question = [
        {
            type: "input",
            name: "Enter",
            message: `Presione ${colors.green("ENTER")} para continuar`,
        },
    ];

    await inquirer.prompt(question);
};

const readInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor ingrese un valor";
                }
                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const listTaskDelete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = colors.green(`${i + 1}.`);
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
        };
    });

    choices.unshift({
        value: "0",
        name: `${colors.green("0.")} Cancelar`,
    })

    const questions = [
        {
            type: "list",
            name: "id",
            message: "Delete",
            choices,
        },
    ];

    const { id } = await inquirer.prompt(questions);
    return id;
};

const questionConfirm = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};

const listTaskComplete = async (tasks = []) => {
    const choices = tasks.map((task, i) => {
        const idx = colors.green(`${i + 1}.`);
        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.complete) ? true : false,
        };
    });

    const questionscheckBox = [
        {
            type: "checkbox",
            name: "ids",
            message: "Completed",
            choices,
        },
    ];

    const { ids } = await inquirer.prompt(questionscheckBox);
    return ids;
};

module.exports = {
    inquiererMenu,
    pause,
    readInput,
    listTaskDelete,
    questionConfirm,
    listTaskComplete,
};
