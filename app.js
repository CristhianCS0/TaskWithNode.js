const colors = require("colors");
const {
    inquiererMenu,
    pause,
    readInput,
    listTaskDelete,
    questionConfirm,
    listTaskComplete,
} = require("./helpers/inquirer");
const {
    saveTaskInDatabase,
    readTaskInDatabase,
} = require("./helpers/saveTask");
const Task = require("./models/task");
const Tasks = require("./models/tasks");

const main = async () => {
    let opt = "";
    const tasks = new Tasks();
    const readDataBase = readTaskInDatabase();

    if (readDataBase) {
        tasks.updloadTask(readDataBase);
    }

    do {
        opt = await inquiererMenu();

        switch (opt) {
            case "1":
                const desc = await readInput("Description:");
                tasks.createTask(desc);
                break;

            case "2":
                tasks.listAllTasks();
                break;

            case "3":
                tasks.listTaskComplete(true);
                break;

            case "4":
                tasks.listTaskComplete(false);
                break;

            case "5":
                const ids = await listTaskComplete(tasks.listTaskArr);
                tasks.toggleComplet( ids );
                break;

            case "6":
                const id = await listTaskDelete(tasks.listTaskArr);
                if (id !== 0) {
                    const ok = await questionConfirm(
                        "¿Seguro desea borrar tarea?"
                    );
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("Task deleted");
                    }
                }
                break;
        }

        saveTaskInDatabase(tasks.listTaskArr);

        await pause();
    } while (opt !== "0");
};

main();
