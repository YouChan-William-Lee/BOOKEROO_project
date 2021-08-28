import React, { Component } from 'react'

class AddBook extends Component {
    constructor(props){
        super(props)
        this.state={
            bookname: ""
        }
    }

    handleName=(e)=>{
        this.setState({
            bookname: e.target.value
        })
    };

    render() {
        return (
            <div class="container-fluid">
                <div class="row">

                    {/* Search bar */}
                    <div class="col-12">
                        <form>
                        <div class="input-group theSearchbarSection">
                            <div class="form-outline">
                                <input class="form-control mr-sm-2 searchbarInputField" type="search" placeholder="Search" aria-label="Search"></input>
                            </div>
                            <button id="search-button" type="submit" class="btn btn-primary"> <i class="fas fa-search searchIcon"></i></button>
                        </div>
                        </form>
                    </div>
                </div>

                {/* Form to add book */}
                <div class="row">

                    {/* Left side of the page (No content) */}
                    <div class="col"></div>

                    {/* Center of the page where the form is */}
                    <div class="col-6 addBookFormSection">
                        
                        <div class = "container-fluid">
                            <div class= "row addBookHeading">
                                <h1>Add a New Book</h1>
                            </div>

                            <div class = "row">
                                <form>
                                    <div>
                                        <div>
                                            <label class="addBookText">Title:</label>
                                            <input name="bookname" placeholder="Book Title" value={this.state.bookname} onChange={this.handleName} />
                                        </div>

                                        <div>
                                            <label class="addBookText">Author:</label>
                                            <input name="bookname" placeholder="Author's Name" value={this.state.bookname} onChange={this.handleName} />
                                        </div>

                                        <div>
                                            <label class="addBookText">Publisher:</label>
                                            <input name="bookname" placeholder="Publisher's Name" value={this.state.bookname} onChange={this.handleName} />
                                        </div>

                                        <div>
                                            <label class="addBookText">ISBN:</label>
                                            <input name="bookname" placeholder="ISBN" value={this.state.bookname} onChange={this.handleName} />
                                        </div>

                                        <div>
                                            <label class="addBookText">Category:</label>
                                            <input name="bookname" placeholder="Category (Genre)" value={this.state.bookname} onChange={this.handleName} />
                                        </div>

                                        <div>
                                            <label class="addBookText">Publication Date:</label>
                                            <input name="bookname" placeholder="Date" value={this.state.bookname} onChange={this.handleName} />
                                        </div>

                                        <div>
                                            <label class="addBookText">Pages:</label>
                                            <input name="bookname" placeholder="Number of pages" value={this.state.bookname} onChange={this.handleName} />
                                        </div>

                                        <div>
                                            <label class="addBookText">Book Cover URL:</label>
                                            <input name="bookname" placeholder="URL" value={this.state.bookname} onChange={this.handleName} />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Submit button */}
                            <div class="row addBookSubmitButton">
                                <button className="btn btn-light my-2 my-sm-0">Submit</button>
                            </div>

                        </div>
                    </div>

                    {/* Right side of the page (no content) */}
                    <div class="col"></div>
                </div>
            </div>
        )
    }
}
export default AddBook;
