let myLibrary = [];
let idCounter = 4

class Book {
    constructor (title, author, pages, read, id) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read,
        this.id = id
    }
}

let library = {
    list: [],
    addBook: function (book){
        library.list.push(book)
    },
    removeBook: function (spliceStart) {
        if (spliceStart === library.list.length + 1) {
            library.list.pop()
        } else {
            library.list.splice(spliceStart, 1)
        }
    },
    toggleRead: function (identifier) {
        console.log(`The identifier is ${identifier}`)
        for (let book of library.list) {
            if (book.id == identifier) {
                if (book.read === "Read") {
                    book.read = "Not Read"
                } else {
                    book.read = "Read"
                }
            }
        }
    },
}
    
const book0 = new Book("The Hobbit", "J.R.R Tolken", 295, "Read", 0);
const book1 = new Book("The Fellowship", "J.R.R Tolken", 295, "Not read", 1);
const book2 = new Book("The Two towers", "J.R.R Tolken", 295, "Read", 2);
const book3 = new Book("The old butt", "J.R.R Tolken", 295, "Not read", 3);

library.addBook(book0)
library.addBook(book1)
library.addBook(book2)
library.addBook(book3)


const submit = document.querySelector(".submit");

//Adds the book to the DOM display of the library

function addBookToLibrary() {
    submit.addEventListener('click', function() {
        const title = document.forms[0].elements[1].value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pageCount').value;
        const completed = document.getElementById('completed');
        const notCompleted = document.getElementById('notCompleted');
        if(title !== "" && author !== "" && pages !== "") {
            i = myLibrary.length

            //create readStatus based on radio
            if (completed.checked) {
                readStatus = completed.value;
            } else {
                readStatus = notCompleted.value;
            }

            //create new book
            const newBook = new Book(title, author, pages, readStatus, idCounter++)

            //add to the library array
            library.addBook(newBook);

            //remove existing
            while (section.firstChild) {
                section.removeChild(section.firstChild)
            }

            //display new
            display(library.list); 
        }
    })
};

//Displaying Library
const section = document.getElementById('catalogue');

function display(libraryArray) {
    let i = 0;
    for (let object of libraryArray) {
        const page = document.createElement("div");
        page.className = `${i}` 
        page.id = object.id

        for (let key in object) {
            if (key !== "id") {
                let text = object[key];

            const para = document.createElement("p");
            const paraText = document.createTextNode(`${key}: ${text}`);
            
            page.appendChild(para);
            para.appendChild(paraText);

            section.appendChild(page);
            }  
        }

        //adding toggle buttons
        const toggle = document.createElement("button");
        const toggleText = document.createTextNode("Toggle Read Status");

        page.appendChild(toggle);
        toggle.appendChild(toggleText); 

        toggle.className = "toggleButton";

        //adding removal buttons
        const button = document.createElement("button");
        const buttonText = document.createTextNode("Remove from Library");

        button.className = "removeButton";

        page.appendChild(button);
        button.appendChild(buttonText);
        
        //removal button functionality
        const removeButtons = document.querySelectorAll(".removeButton")
        
        removeButtons.forEach(instance => {
            instance.addEventListener('click', removeFunction)
        })

        //toggle button functionality
        const toggleButtons = document.querySelectorAll(".toggleButton")

        toggleButtons.forEach(instance => {
            instance.addEventListener('click', toggleRead)
        })

        i += 1;
    }
}

display(library.list)

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeFunction (e) {
    let spliceStart = Number(e.target.parentNode.className)
    library.removeBook(spliceStart)
    removeAllChildNodes(e.target.parentNode.parentNode)
    display(library.list);
}        

function toggleRead (e) {
    const idValue = e.target.parentNode.id
    library.toggleRead(idValue)
    removeAllChildNodes(e.target.parentNode.parentNode)
    display(library.list);
}