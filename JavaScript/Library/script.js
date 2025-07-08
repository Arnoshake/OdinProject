class Book{
    constructor(title, author, wordCount, haveRead){
        this.title = title;
        this.author = author;
        this.wordCount = wordCount;
        this.haveRead = haveRead;
        this.bookId = crypto.randomUUID();
    }
    toggleHasRead(){ //considered a prototype method bc declared inside class
        this.haveRead = !(this.haveRead);
    }
}
class Library{
    constructor(){
        this.myLibrary = [];
    }
    addBookToLibrary(title, author, wordCount, haveRead){
        const bookToAdd = new Book(title, author, wordCount, haveRead);
        this.myLibrary.push(bookToAdd);
        this.renderTable();
    }
    deleteBookFromLibrary(bookID){
        const index = this.myLibrary.findIndex(book => book.bookId === bookID);
        if (index === -1){
            alert("Book Not Found! Please try again later.");
        }
        this.myLibrary.splice(index,1);
        this.renderTable();
    }
    addTableRow(book){ // rows are only added for a new book
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
        const toggleReadButton = document.createElement("button");

        toggleReadButton.textContent = book.haveRead;
        toggleReadButton.classList.add("read-toggle");

        // explicitly resetting the classes
        if (book.haveRead) {
            toggleReadButton.classList.add("read");
            toggleReadButton.classList.remove("unread");
        } else {
            toggleReadButton.classList.add("unread");
            toggleReadButton.classList.remove("read");
        }

        toggleReadButton.addEventListener("click", () => {
            book.toggleHasRead();
            this.renderTable();
        });

        haveReadCell.appendChild(toggleReadButton);
        row.appendChild(haveReadCell);

        const deleteCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "delete";
        deleteButton.addEventListener("click", () => {
            console.log(`Deleting this book! ${book.title} by ${book.author} (${book.bookId})`);
            this.deleteBookFromLibrary(book.bookId);
            
        });
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    }
    renderTable(){
        const libraryTable = document.querySelector("#library-table");
        const tableBody = document.querySelector("#library-table tbody");
        tableBody.innerHTML = ""; //clear the table, re-rendering it

        for (const book of this.myLibrary){
            this.addTableRow(book);
        }
    }
    addDummyBooks(){
        this.addBookToLibrary("Dune","Frank Herbert", 187240,true);
        this.addBookToLibrary("A Game of Thrones","George R.R Martin", 298000,true);
        this.addBookToLibrary("The War of the Worlds","H.G Wells", 63000,false);
    }
}







const myLibrary = new Library();
document.getElementById("add-book-form").addEventListener("submit",function(event){
    event.preventDefault(); //forms reload page by default
    
    const bookTitle = document.getElementById("title").value;
    const bookAuthor = document.getElementById("author").value;
    const bookWordCount = parseInt(document.getElementById("wordCount").value);
    const bookHaveRead = document.getElementById("read").checked;

    myLibrary.addBookToLibrary(bookTitle, bookAuthor, bookWordCount, bookHaveRead);
    console.log(myLibrary);
});
myLibrary.addDummyBooks()
myLibrary.renderTable();