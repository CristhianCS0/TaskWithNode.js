const colors = require("colors");

const Task = require("./task");

class Tasks {
    _list = {};

    get listTaskArr() {
        const listTask = [];
        Object.keys(this._list).forEach((key) => {
            const task = this._list[key];
            listTask.push(task);
        });

        return listTask;
    }

    constructor() {
        this._list = {};
    }

    deleteTask(id = "") {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    updloadTask(task = []) {
        task.forEach((task) => {
            this._list[task.id] = task;
        });
    }

    createTask(desc = "") {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    listAllTasks() {
        this.listTaskArr.forEach((task, i) => {
            const idx = colors.green(`${i + 1}`);
            const { desc, complete } = task;
            const status = complete
                ? colors.blue("Completada")
                : colors.red("No completada");

            console.log(`${idx} ${desc} :: ${status}`);
        });
        console.log("");
    }

    listTaskComplete(completeTrueFalse = true) {
        console.log("");
        let counter = 0;

        this.listTaskArr.forEach((task) => {
            const { desc, complete } = task;
            const status = complete
                ? colors.yellow("Completada")
                : colors.red("No completada");

            if (completeTrueFalse) {
                if (complete) {
                    counter += 1;
                    let count = colors.green(`${counter.toString()}.`);
                    console.log(`${count} ${desc} :: Completada: ${complete}`);
                }
            } else {
                if (!complete) {
                    counter += 1;
                    let count = colors.green(`${counter.toString()}.`);
                    console.log(`${count} ${desc} :: ${status}`);
                }
            }
        });
        console.log("");
    }

    toggleComplet(ids = []) {
        ids.forEach((id) => {
            const task = this._list[id];
            if (!task.complete) {
                task.complete = new Date().toISOString();
            }
        });

        this.listTaskArr.forEach( task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].complete = null;
            }
        })
    }
}

module.exports = Tasks;
