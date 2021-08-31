import React, { Component } from 'react'

class AddBook extends Component {

    // Maintain current data in the state
    constructor(props){
        super(props)
        this.state={
            title: "",
            author: "",
            publisher: "",
            isbn: "",
            category: "",
            date: "",
            pages: "",
            url: ""
        }
    }

    handleNewBook=(e)=>{
        this.setState({
            // Common statement to change state based on the input
            // target.name is the name given to each of the input fields.
            // target.value is what is eneterd by the user
            [e.target.name]: e.target.value
        })
    };

    render() {
        return (
            <div className="container-fluid">
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
                <div className="row">

                    {/* Left side of the page (No content) */}
                    <div className="col"></div>

                    {/* Center of the page where the form is */}
                    <div className="col-6 addBookFormSection">
                        
                        <div className = "container-fluid">
                            <div className= "row addBookHeading">
                                <h1>Add a New Book</h1>
                            </div>

                            <div className = "row">
                                <form>
                                    <div>
                                        <div>
                                            <label className="addBookText">Title:</label>
                                            <input name="title" placeholder="Book Title" value={this.state.title} onChange={this.handleNewBook} />
                                        </div>

                                        <div>
                                            <label className="addBookText">Author:</label>
                                            <input name="author" placeholder="Author's Name" value={this.state.author} onChange={this.handleNewBook} />
                                        </div>

                                        <div>
                                            <label className="addBookText">Publisher:</label>
                                            <input name="publisher" placeholder="Publisher's Name" value={this.state.publisher} onChange={this.handleNewBook} />
                                        </div>

                                        <div>
                                            <label className="addBookText">ISBN:</label>
                                            <input name="isbn" placeholder="ISBN" value={this.state.isbn} onChange={this.handleNewBook} />
                                        </div>

                                        <div>
                                            <label className="addBookText">Category:</label>
                                            <input name="category" placeholder="Category (Genre)" value={this.state.category} onChange={this.handleNewBook} />
                                        </div>

                                        <div>
                                            <label className="addBookText">Publication Date:</label>
                                            <input name="date" placeholder="Date" value={this.state.date} onChange={this.handleNewBook} />
                                        </div>

                                        <div>
                                            <label className="addBookText">Pages:</label>
                                            <input name="pages" placeholder="Number of pages" value={this.state.pages} onChange={this.handleNewBook} />
                                        </div>

                                        <div>
                                            <label className="addBookText">Book Cover URL:</label>
                                            <input name="url" placeholder="URL" value={this.state.url} onChange={this.handleNewBook} />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Submit button */}
                            <div className="row addBookSubmitButton">
                                <button className="btn btn-light my-2 my-sm-0">Submit</button>
                            </div>

                        </div>
                    </div>

                    {/* Right side of the page (no content) */}
                    <div className="col"></div>
                </div>
            </div>
        )
    }
}
export default AddBook;
