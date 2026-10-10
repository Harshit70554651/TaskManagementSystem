const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks
 = document.querySelectorAll('.task')
let dragElement = null;


tasks.forEach(task =>{
  task.addEventListener("drag", (e) =>{
     dragElement = task;
        
  })
})

// progress.addEventListener('dragenter', (e) =>{
//   progress.classList.add('hover-over')
// })

// progress.addEventListener('dragleave', (e)=>{
//   progress.classList.remove('hover-over')
// })

  function addDragEventOnColumn(coloum){
    coloum.addEventListener('dragenter', (e)=>{
      e.preventDefault();
      coloum.classList.add('hover-over');

    })
    coloum.addEventListener('dragleave', (e)=>{
       e.preventDefault()
       coloum.classList.remove('hover-over');

    })

    coloum.addEventListener('dragover', (e)=>{
      e.preventDefault();
    
    })

    coloum.addEventListener('drop', (e)=>{
      e.preventDefault();
        coloum.appendChild(dragElement);
    coloum.classList.remove('hover-over')

    })
  
    
  }
  addDragEventOnColumn(todo);
  addDragEventOnColumn(progress);
  addDragEventOnColumn(done);


