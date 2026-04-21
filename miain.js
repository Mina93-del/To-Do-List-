let addtask = document.querySelector(".add-task-icon");
let removediv = document.querySelector(".adding");

addtask.addEventListener(`click`, () => {
    removediv.classList.toggle("active")
});
const pendtask = document.querySelector(".pending-tasks");
const box = pendtask.querySelector(".boxes");

const comdtask = document.querySelector(".completed-tasks");
const comp = comdtask.querySelector(".boxes");
console.log(comdtask);
const mytask = document.getElementById("my-task");
const addtassk = document.getElementById("submit");



let mytaskarray = [];

if (localStorage.getItem("tasks")) {
    mytaskarray = JSON.parse(localStorage.getItem("tasks"));
}


getelementfromlocal();
addecomptopage(mytaskarray)

addtassk.onclick = function () {
    if (mytask.value.trim() === "") {
        window.alert("please write your task")
    } else {
        addtaskarray(mytask.value);
        mytask.value = ""
        // const tasks = JSON.parse(localStorage.getItem("items")) || [];
        // localStorage.setItem("tasks" , JSON.stringify(mytask.value))  
    }
}
function addtaskarray(tasktext) {
    const task = {
        id: Date.now(),
        title: tasktext,
        completed: false
    };
    mytaskarray.push(task);
    addelementtopage(mytaskarray);
    addelementtolocal(mytaskarray);

}


function addelementtopage(mytaskarray) {
    box.innerHTML = "";
    {
        mytaskarray.forEach(element => {
            if (element.completed == false) {

                let completedClass = element.completed ? "activa" : "";

                box.innerHTML += `
                   <div class="box" data-index="${element.id}">
                    <div class="title">
                            <div  class="empty-icon ${completedClass}" >
                            <i class="fa-solid fa-check"></i>
                            </div>
                            <h3>${element.title}</h3>
                        </div>
                        <div class="icons">
                            <a class="deleteelement" href="#"><i class="fa-solid fa-trash"></i></a>
                            <a class="updateelement" href="#">
                                <i class="fa-solid fa-pen"></i>
                            </a>
                        </div> 
                     </div>
`

            }
        });
    }
}
function addecomptopage(mytaskarray) {
    comp.innerHTML = "";
    {
        mytaskarray.forEach(element => {
            let completedClass = element.completed;
            if (completedClass == true) {
                comp.innerHTML += `
                   <div class="box" data-index="${element.id}">
                        <div class="title">
                            <div class="icon"><i class="fa-solid fa-check"></i></div>
                            <h3>${element.title}</h3>
                        </div>
                        <div class="icons">
                            <a class="deleteelement" href="#"><i class="fa-solid fa-trash"></i></a>
                            <a class="updateelement" href="#">
                                <i class="fa-solid fa-pen"></i>
                            </a>
                        </div> 
                    </div>
`

            }
        });
    }
}




document.addEventListener("click", (e) => {
    if (e.target.closest(".deleteelement")) {
        removeeleminlocal(e.target.closest(".box"))

    }
})

// document.addEventListener("click" ,(e)  =>{
//     if (e.target.closest(".updateelement")) {
//         const divbox = e.target.closest(".box");
//         updbox = divbox.querySelector("h3")
//        updateeleminlocal(updbox);
//                console.log(updbox)
//             }
// })
document.addEventListener("click", (e) => {
    if (e.target.closest(".empty-icon")) {
        const boxdone = e.target.closest(".empty-icon");
        boxdone.classList.toggle("activa")
        //     updbox = divbox.querySelector("h3")
        //    console.log();
        completeelemin(e.target.closest(".box"));


    }
})

function removeeleminlocal(elemdeleted) {
    const removeditem = Number(elemdeleted.dataset.index);
    mytaskarray = mytaskarray.filter(e => e.id !== removeditem);
    window.localStorage.setItem("tasks", JSON.stringify(mytaskarray));
    addelementtopage(mytaskarray);
    addecomptopage(mytaskarray);

}



function addelementtolocal(mytaskarray) {
    window.localStorage.setItem("tasks", JSON.stringify(mytaskarray));
}

function getelementfromlocal() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        mytaskarray = JSON.parse(data);
        addelementtopage(mytaskarray);
        addecomptopage(mytaskarray);


    }
}

function completeelemin(compdiv) {

    const compileitem = Number(compdiv.dataset.index);
    mytaskarray.forEach((item) => {
        if (compileitem == item.id && item.completed == false) {
            item.completed = true;
        } else if (compileitem == item.id && item.completed == true) {
            item.completed = false;
        }
    }
    )
    addelementtopage(mytaskarray);
    addecomptopage(mytaskarray);
    window.localStorage.setItem("tasks", JSON.stringify(mytaskarray));


}