const remember = document.getElementById(`formTask`)
remember.addEventListener(`submit`, saveTask)

function saveTask(e){       //`e` es una varibale para que al momento de ponerle el método default me mantega ese valor 

    let title = document.getElementById(`title`).value
    //console.log(title)    // Para obtener el valor

    let description = document.getElementById(`description`).value
    // console.log(title, description);

    const task = {
        title,          // = title: title
        description     // description: description 
    };

    // console.log(task)

    // nos permite almacenar los datos dentro del navegador si se cierra y se abre siguen en el navegador
    //localStorage.setItem('tasks', JSON.stringify(task))
    // setItem  Nos permite almacear datos 
    //tiene dos parametro:     nombre de como se van a llamar esos datos y que dato vamos a guardar 
    //JSON.stringify        Es un metodo de json para convertir el objeto task a un string

    // el nombre del los datos que queremos obtener, como le pusismos tasks eso le colocamos
    //console.log(localStorage.getItem('tasks'))
    // console.log(JSON.parse(localStorage.getItem('tasks')))     //Para que se imprima como objeto de nuevo en la consola
    
    if(localStorage.getItem(`tasks`) === null) {        // en caso de que no haya entonces las llenamos
        let tasks = [];
        tasks.push(task);
        localStorage.setItem(`tasks`, JSON.stringify(tasks));
    } else {        //Obtenemos las tareas que hay en el LocalStorage y ponerlas en una variable 
        let tasks = JSON.parse(localStorage.getItem(`tasks`));     
        tasks.push(task);    // Actualiza las tareas ya almacenadas 
        localStorage.setItem(`tasks`, JSON.stringify(tasks));    
    }
    

    getTasks()         // Para que pueda guardar distintos
    document.getElementById(`formTask`).reset()         //Para que cada que se crea un nuevo campo se resete y no permanezca el texto
    e.preventDefault()
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem(`tasks`));
    let taskView = document.getElementById(`tasks`);

    taskView.innerHTML = ``

        // Para que vaya recorriendo cada posición de 
    for (let i of tasks) {
        let title = i.title
        let description = i.description

                // +=  para que cada tarea cada vez que se recorra se vaya agregando al tasksView
        taskView.innerHTML += `
        <div class="card ml-5 mb-4">
            <div class="card-body">
                <p><h3>${title}</h3> - <i>${description}</i></p>
                <a class="btn btn-warning" onclick="deleteTask('${title}')">Delete</a>
            </div>
        </div>
        `
        console.log(i);
    }

}


function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'))

    for(let tareas of tasks){
        if (tareas.title == title){
            tasks.splice(tareas, 1)
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
    getTasks()
}

getTasks()