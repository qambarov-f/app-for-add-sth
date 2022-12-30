// app constructor
function App(author, book, image){
    this.author = author;
    this.book = book;
    this.image = image;
}

// ui constructor
function UI(){

}

UI.prototype.addBooksToList = function(searchApp){
    const list = document.getElementById('form-list');

    var html = `
        <tr>
        <td><img class="image" src="image/${searchApp.image}"/></td>
        <td>${searchApp.author}</td>
        <td>${searchApp.book}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;
    list.innerHTML += html;
}

UI.prototype.clearControls = function(){
    const author = document.getElementById('author').value="";
    const book = document.getElementById('book').value="";
    const image = document.getElementById('image').value="";
}
UI.prototype.deleteElements = function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}
UI.prototype.showAlert = function(message, className){
    
    var alert = `
        <div class="alert alert-${className}">
        ${message} 
        </div>   
    `;

    const row = document.querySelector('.row');
    row.insertAdjacentHTML('beforeBegin', alert);

    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },2000);

}

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
    
        // clear controls
         ui.clearControls();

        ui.showAlert('Form added succesfully.', 'success')
    }


    e.preventDefault();

});


document.getElementById('form-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteElements(e.target);
    ui.showAlert('The form has been deleted.','danger')
});