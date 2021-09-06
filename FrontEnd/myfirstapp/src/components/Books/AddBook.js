import React, { Component } from 'react'


class AddBook extends Component {

    // Maintain current data in the state
    constructor(props){
        super(props);

        this.state={
            title: "",
            author: "",
            unitPrice: "",
            isbn: "",
            category: "",
            date: "",
            pages: "",
            url: "",
            unitPrice: "",
            numOfNewBook: "",
            numOfOldBook: ""
        };

        this.handleNewBook = this.handleNewBook.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Common statement to change state based on the input
    // target.name is the name given to each of the input fields.
    // target.value is what is eneterd by the user
    handleNewBook=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    // Handling the submit button
    handleSubmit=(e)=>{
        // Preventing the default action of the form
        e.preventDefault()

        // Creating a new book with the data entered
        const newBook = {
            title: this.state.title,
            author: this.state.author,
            unitPrice: this.state.unitPrice,
            isbn: this.state.isbn,
            category: this.state.category,
            date: this.state.date,
            pages: this.state.pages,
            url: this.state.url,
            numOfNewBook: this.state.numOfNewBook,
            numOfOldBook: this.state.numOfOldBook
        }

        // NOT SURE WHAT THIS COMMAND DOES...NEED TO CREATE THIS FUNCTION
        this.props.createBook(newBook, this.props.history);

        console.log("New Book Details: ", newBook)
    }

    render() {
        return (
            <div className="container">
                <div className="row">

                    {/* Search bar */}
                    <div className="col-12">
                        <form>
                        <div className="input-group theSearchbarSection">
                            <div className="form-outline">
                                <input className="form-control mr-sm-2 searchbarInputField" type="search" placeholder="Search" aria-label="Search"></input>
                            </div>
                            <button id="search-button" type="submit" className="btn btn-primary"> <i className="fas fa-search searchIcon"></i></button>
                        </div>
                        </form>
                    </div>
                </div>

                {/* Form to add book */}
                <div className="row mt-3 mb-3">
                    <div class="col-md-6 offset-md-3 addBookFormSection">
                        {/* Form heading */}
                        <h1>Add a New Book</h1>

                        {/* Input fields for the form */}
                        <form onSubmit={this.handleSubmit}>
                            <div className= "from-group">
                                <label className="addBookText">Title:</label>
                                <input required className= "form-control" type= "text" name="title" placeholder="Book Title" value={this.state.title} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Author:</label>
                                <input required className= "form-control" type= "text" name="author" placeholder="Author's Name" value={this.state.author} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Price:</label>
                                <input required className= "form-control" type= "number" name="unitPrice" placeholder="Price of Book" value={this.state.unitPrice} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">ISBN:</label>
                                <input required className= "form-control" type= "text" name="isbn" placeholder="ISBN" value={this.state.isbn} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Category:</label>
                                <input required className= "form-control" type= "text" name="category" placeholder="Category (Genre)" value={this.state.category} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Publication Date:</label>
                                <input required className= "form-control" type= "date" name="date" placeholder="Date Published" value={this.state.date} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Pages:</label>
                                <input required className= "form-control" type= "number" name="pages" placeholder="Number of pages" value={this.state.pages} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group">
                                <label className="addBookText">Book Cover URL:</label>
                                <input required className= "form-control" type= "url" name="url" placeholder="URL" value={this.state.url} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group"> 
                                <label className="addBookText">Number of New Books</label>
                                <input required className= "form-control" type= "number" name="numOfNewBook" placeholder="Number of New Books" value={this.state.numOfNewBook} onChange={this.handleNewBook} />
                            </div>

                            <div className= "from-group"> 
                                <label className="addBookText">Number of Old Books</label>
                                <input required className= "form-control" type= "number" name="numOfOldBook" placeholder="Number of Old Books" value={this.state.numOfOldBook} onChange={this.handleNewBook} />
                            </div>

                            {/* Submit button */}
                            <div className="row addBookSubmitButton">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddBook;
