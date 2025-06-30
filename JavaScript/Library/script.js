const myLibrary = [];
/*
    Have a table center of page, holds/displays books
        Each cell of the table stores the book cover or an image and a delete button
            Clicking upon the cell/image, it flips around to show the book data (title, author, pages)
        read books have a different background color than unread
    SideBar forum for adding new books

*/ 

function Book(title, author, wordCount, haveRead) { // constructor
    this.title = title;
    this.author = author;
    this.wordCount = wordCount;
    this.haveRead = haveRead;
    this.bookId = crypto.randomUUID()
}

function addBookToLibrary(title, author, wordCount, haveRead) {
    const bookToAdd = new Book(title, author, wordCount, haveRead);
    myLibrary.push(bookToAdd);
    renderTable();
}
function deleteBookFromLibrary(bookID){
    const index = myLibrary.findIndex(book => book.bookId === bookID);
    if (index === -1){
        alert("Book Not Found! Please try again later.");
    }
    myLibrary.splice(index,1);
    renderTable();

}

function addTableRow(book){ // rows are only added for a new book
    const libraryTable = document.querySelector("#library-table");
    const rows = document.getElementsByTagName("tr");
    const tableBody = document.querySelector("#library-table tbody");

    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement("td");
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    const wordCountCell = document.createElement("td");
    wordCountCell.textContent = book.wordCount;
    row.appendChild(wordCountCell);

    const haveReadCell = document.createElement("td");
    haveReadCell.textContent = book.haveRead;
    row.appendChild(haveReadCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
        console.log(`Deleting this book! ${book.title} by ${book.author} (${book.bookId})`);
        deleteBookFromLibrary(book.bookId);
        
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);

}
function renderTable(){
    const libraryTable = document.querySelector("#library-table");
    const tableBody = document.querySelector("#library-table tbody");
   tableBody.innerHTML = ""; //clear the table, re-rendering it

    for (const book of myLibrary){
        addTableRow(book);
    }
    
}



addBookToLibrary("Dune","Frank Herbert", 187240,true);
addBookToLibrary("A Game of Thrones","George R.R Martin", 298000,true);
addBookToLibrary("The War of the Worlds","H.G Wells", 63000,false);
console.log(myLibrary);
renderTable();