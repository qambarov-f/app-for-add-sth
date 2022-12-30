// app class
class App {
    constructor(author, book, image){
        this.listId = Math.floor(Math.random()*1000);
        this.author = author;
        this.book = book;
        this.image = image;
    }
}
// ui class
class UI {
    addBooksToList(searchApp){
        const list = document.getElementById('form-list');

        var html = `
        <tr>
        <td><img class="image" src="image/${searchApp.image}"/></td>
        <td>${searchApp.author}</td>
        <td>${searchApp.book}</td>
        <td> <a href="#" data-id="${searchApp.listId}" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
        `;

        list.innerHTML += html;
    }
    clearControls(){
        const author = document.getElementById('author').value="";
        const book = document.getElementById('book').value="";
        const image = document.getElementById('image').value="";
    }
    deleteElements(element){
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true;
        }
    }
    showAlert(message,className){

        var alert = `
        <div class="alert alert-${className}">
        ${message}
        </div>
        `;
        const row = document.querySelector('.row');
        row.insertAdjacentHTML('beforebegin',alert);

        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },2000);
    }
}

class Storage {
    static getLists(){

        let lists;

        if(localStorage.getItem('lists')=== null){
            lists=[];
        } else{
            lists = JSON.parse(localStorage.getItem('lists'));
        }

        return lists;
    }

    static displayLists(){
        const lists = Storage.getLists();
        
        lists.forEach(searchApp => {
            const ui = new UI();
            ui.addBooksToList(searchApp);
        });
    }

    static addList(searchApp){
        const lists = Storage.getLists();
        lists.push(searchApp);
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    static deleteList(element){
        if(element.classList.contains('delete')){
            const id = element.getAtribute('data-id');

            const lists = Storage.getLists();

            lists.forEach((lists, index)=>{
                if(searchApp.listId == id){
                    lists.splice(index,1);
                }
            });
            localStorage.setItem('lists', JSON.stringify(lists));
        }
    }
}

document.addEventListener('DOMContentLoaded', Storage.displayLists);

document.getElementById('new-form').addEventListener('submit', function(e){

    const author = document.getElementById('author').value;
    const book = document.getElementById('book').value;
    const image = document.getElementById('image').value;

    // create class object
    const searchApp = new App(author, book, image);

    // create UI
    const ui = new UI();

    if(author === '' || book === '' || image === ''){
        ui.showAlert('Please add something.','warning')
    } else{
        // add books to list
        ui.addBooksToList(searchApp);
    
        // save to LS
        Storage.addList(searchApp);
        // clear controls
         ui.clearControls();

        ui.showAlert('Form added succesfully.', 'success')
    }


    e.preventDefault();

});


document.getElementById('form-list').addEventListener('click', function(e){
    const ui = new UI();
    // delete list
   if(ui.deleteElements(e.target) == true){
       // delete list LS
       Storage.deleteList(e.target);
    
       ui.showAlert('The form has been deleted.', 'danger');
   }


});