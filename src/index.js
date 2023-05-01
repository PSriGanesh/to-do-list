import './style.css';
import {Project} from './project'
import {Task} from './task'
import { format, startOfWeek } from 'date-fns'
import { endOfWeek } from 'date-fns'
import { compareAsc } from 'date-fns'
let sidebtn = document.querySelectorAll('.side-btn')
let tform = document.querySelector('.task-form')
let pform = document.querySelector('.project-form')
let overlay = document.querySelector('.overlay')
let content=document.querySelector('#content')
let currentProjectIndex;
sidebtn[1].addEventListener('click',()=>{
    document.querySelector('#projects').children[currentProjectIndex].classList.remove('active');
    tabselect("This Week");
    let temp = document.createElement('div')
    temp.classList.add('task-container')
    temp.classList.add('fadeInUp');
    content.appendChild(temp)
    let weekStart = format(startOfWeek(new Date(),{ weekStartsOn: 1 }),'yyyy-MM-dd')
    let weekEnd = format(endOfWeek(new Date(),{weekStartsOn: 1}),'yyyy-MM-dd')
    let today = new Date();
    let tempindex=0
    projarr.forEach(p=> {
        p.projtasks.forEach(i=>{
            if(weekStart<=i.due && i.due<=weekEnd){
                createTaskElement(temp,tempindex++,i);
                temp.children[tempindex-1].children[3].remove()
            }
        })
    })
    sortTasks();
})

function sortTasks(){
    let tasks = document.querySelector('.task-container').children
    let temp;
    let n = tasks.length;
    for(let i=0;i<n-1;i++){
        for(let j=0;j<n-1;j++){
            let n1=document.querySelector('.task-container').children[j]
            let n2=document.querySelector('.task-container').children[j+1]
            let d1 = n1.children[2].innerHTML.slice(5).split('-')
            d1.reverse();
            let dd1 = new Date(d1.join())
            let d2 = n2.children[2].innerHTML.slice(5).split('-')
            d2.reverse();
            let dd2 = new Date(d2.join())
            if(compareAsc(dd1,dd2)==1){
                n1.parentNode.insertBefore(n2,n1)
            }
        }
    }
}
window.sortTasks=sortTasks;
function createTaskElement(temp,taskindex,j){
    let taskParent = document.createElement('div')
        taskParent.style.cssText='display: flex;'
        let taskChild=document.createElement('div')
        taskParent.setAttribute('id',`task${taskindex}`)
        if (j.status == true) {
            taskChild.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" role="img" aria-labelledby="ahcr51lib56jls32q1azcq34x6j6z521 axd87tpdas8v9yqkh1dj0528gecz53h" class="h-6" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>';
        } else {
            taskChild.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
        }
        taskParent.appendChild(taskChild)
        taskChild.style.cssText='height: 30px;width: 30px;color: white;'
        taskChild.addEventListener('click',()=>{
            let check = document.querySelector('#'+taskParent.getAttribute('id')).children[0]
            if (j.status == false) {
              check.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" role="img" aria-labelledby="ahcr51lib56jls32q1azcq34x6j6z521 axd87tpdas8v9yqkh1dj0528gecz53h" class="h-6" data-darkreader-inline-fill="" style="--darkreader-inline-fill:currentColor;"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>';
              j.status = true;
            } else {
              check.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
              j.status = false;
            }
            localStorage.projectArray=JSON.stringify(projarr);
        })
        taskChild=document.createElement('div')
        taskChild.textContent=j.name;
        taskChild.style.cssText='flex: 1 1 0;'
        taskParent.appendChild(taskChild)
        taskChild=document.createElement('div')
        taskChild.textContent='Due: '+format(new Date(j.due),'dd-MM-yyyy');
        taskParent.appendChild(taskChild)
        taskChild=document.createElement('div')
        taskChild.style.cssText='height: 25px;width: 25px;color: white;'
        taskChild.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete</title><path fill="#FFFFFF" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>';   
        taskParent.appendChild(taskChild)
        taskChild.addEventListener('click',()=>{
            let parentElement = document.querySelector('#'+taskParent.getAttribute('id'));
            parentElement.remove()
            let removeIndex = parseInt(taskParent.getAttribute('id').slice(4))
            projarr[currentProjectIndex].projtasks.splice(removeIndex,1)
            localStorage.projectArray=JSON.stringify(projarr);
        })
        taskParent.classList.add('task-row')
        temp.appendChild(taskParent)
}
function tabselect(name){
    content.innerHTML=''
    let temp=document.createElement('h1');
    temp.textContent=name;
    temp.classList.add('pheading')
    temp.classList.add('fadeInUp')
    content.appendChild(temp)
    temp=document.createElement('hr');
    temp.classList.add('pUnderline')
    content.appendChild(temp);
}
window.tabselect=tabselect;
sidebtn.forEach(sb => {
    sb.addEventListener('click',()=> {
        sb.classList.add('active')
    })
})
let inputs = document.querySelectorAll('.input-container input')
inputs.forEach((input)=> {
    input.addEventListener('blur',()=> {
        let templabel = input.nextElementSibling;
        if(input.value!="") {
            templabel.classList.add('valid');
        }
        else {
            templabel.classList.remove('valid');
        }
    });
});

let pList=[];
let projarr=[]
function addProject(){                          // TREE SHAKING!!!!!!
    let pname = document.querySelector('#pname').value
    let proj = new Project(pname);
    projarr.push(proj)
    overlay.click();
    updateProjects();
    
}

function addTask(){
    let i = currentProjectIndex
    let tname = document.querySelector('#tname').value
    let tdate = document.querySelector('#tdate').value
    let t = new Task(tname,tdate)
    projarr[i].projtasks.push(t);
    updateProjectTasks(i);
    overlay.click()
}

function initialize(){
    if(localStorage.length!=0 && localStorage.projectArray.length>2 ){
        projarr = JSON.parse(localStorage.projectArray)
        updateProjects();
        highlight(0);
        document.querySelector('#projects').children[0].click();
        return;
    }
    currentProjectIndex=-1
    document.querySelector('#pname').value='To-Do'
    addProject();
    document.querySelector('#pname').value=''
    return;
}
window.addTask=addTask
window.initialize=initialize
window.addProject=addProject
initialize()
function updateProjects(){
    let index=0;
    let projects=document.querySelector('#projects');
    projects.innerHTML=''
    projarr.forEach((i)=>{
        let child=document.createElement('div');
        child.classList.add('side-btn')
        child.setAttribute('data-index',index++);
        child.textContent = i.name
        child.addEventListener('click',()=>{                  //can't add event listeners to project objects cause they're not part of the DOM yet
            tabselect(i.name)
            let temp=document.createElement('button')
            temp.textContent="+ Add Task";
            temp.classList.add('addTask')
            temp.classList.add('fadeInUp')
            temp.addEventListener('click',()=>{
                insertProjectTask(child.getAttribute('data-index'));
            })
            content.appendChild(temp);
            temp = document.createElement('div')
            temp.classList.add('task-container')
            temp.classList.add('fadeInUp')
            content.appendChild(temp)
            updateProjectTasks(child.getAttribute('data-index'))
            highlight(child.getAttribute('data-index'))
        })
        projects.appendChild(child)
        child.click();
        let grandchild = document.createElement('div');
        grandchild.style.cssText = 'height: 20px;width: 20px; position: absolute; right: 10px;top: 11px;display: none;'
        grandchild.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Delete</title><path fill="#FFFFFF" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>'
        child.appendChild(grandchild)
        grandchild.addEventListener('click',(e)=>{
            e.stopPropagation();
            let deleteIndex=child.getAttribute('data-index')
            let toDelete = document.querySelector('.side-btn[data-index="'+deleteIndex+'"]')
            if(currentProjectIndex==deleteIndex)
                content.innerHTML=''
            projarr.splice(deleteIndex,1)
            toDelete.remove();
            localStorage.projectArray=JSON.stringify(projarr);
        })
        child.addEventListener('mouseover',()=>{
            child.children[0].style.display='block'
        })
        child.addEventListener('mouseout',()=>{
            child.children[0].style.display='none'
        })
    })
    localStorage.projectArray=JSON.stringify(projarr);
}
window.updateProjects=updateProjects
function insertProjectTask(i){
    currentProjectIndex=i
    tform.classList.add('active')
    overlay.style.display = 'block'
}
window.insertProjectTask=insertProjectTask
function updateProjectTasks(i){
    let temp=document.querySelector('.task-container')
    temp.innerHTML=''
    let taskindex=0;
    projarr[i].projtasks.forEach((j)=>{
        createTaskElement(temp,taskindex,j);
        let inp =document.createElement('input')
        inp.setAttribute('type','text')
        inp.style.cssText='margin-right: auto;display: none;'
        temp.children[taskindex].insertBefore(inp,temp.children[taskindex].children[1]);
        inp =document.createElement('input')
        inp.setAttribute('type','date')
        inp.style.cssText='display: none;'
        temp.children[taskindex].insertBefore(inp,temp.children[taskindex].children[4]);
        taskindex++;
    })
    Array.from(temp.children).forEach(i=>{
        i.children[2].addEventListener('click',()=>{
            i.children[1].value=i.children[2].textContent
            i.children[1].style.display='block'
            i.children[1].focus();
            i.children[2].style.display='none'
            i.children[1].addEventListener('focusout',()=>{
                let taskid= i.getAttribute('id').slice(4)
                projarr[currentProjectIndex].projtasks[taskid].name=i.children[1].value;
                i.children[1].style.display='none'
                i.children[2].style.display='block'
                i.children[2].textContent=i.children[1].value;
                localStorage.projectArray=JSON.stringify(projarr);
            })
        })
        i.children[3].addEventListener('click',()=>{
            i.children[4].style.display='block'
            i.children[4].focus();
            i.children[3].style.display='none'
            i.children[4].addEventListener('focusout',()=>{
                if(i.children[4].value==''){
                    i.children[3].style.display='block'
                    i.children[4].style.display='none'
                    return;
                }
                i.children[3].textContent='Due: '+format(new Date(i.children[4].value),'dd-MM-yyyy')
                i.children[4].style.display='none'
                i.children[3].style.display='block'
                let taskid= i.getAttribute('id').slice(4)
                projarr[currentProjectIndex].projtasks[taskid].due=i.children[4].value;
                localStorage.projectArray=JSON.stringify(projarr);
            })
        })
    })
    localStorage.projectArray=JSON.stringify(projarr);
}
window.updateProjectTasks=updateProjectTasks
function highlight(ind){
    let projects=document.querySelector('#projects').children;
    sidebtn[1].classList.remove('active');
    Array.from(projects).forEach((i)=>{
        if(i.getAttribute('data-index')!=ind){
            i.classList.remove('active')
        }
        else{
            i.classList.add('active')
            currentProjectIndex = i.getAttribute('data-index')
        }
    })
}
window.highlight=highlight



let projectbtn = document.querySelectorAll('.side-btn')[0];
projectbtn.addEventListener('click',()=>{
    pform.classList.add('active')
    overlay.style.display = 'block'
})

overlay.addEventListener('click',()=>{
    sidebtn[0].classList.remove('active')
    tform.classList.remove('active')
    pform.classList.remove('active')
    overlay.style.display='none';
});