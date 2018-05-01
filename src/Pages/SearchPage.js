import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookItem from '../Components/BookItem'

import { update, search } from '../BooksAPI'


class SearchPage extends Component {
    state = {
        books: []
    }

    handleSearch = (event) => {

        let query = event.target.value;

        search(query.trim()).then((results) => {
            if (!Array.isArray(results)) {
                return
            }
            console.log('====================================');
            console.log(results);
            console.log('====================================');
            this.setState({
                books: results
            })
        }).catch((error) => {
            console.log('search error')
        })

    }

    addToShelf = (book, shelf) => {
        update(book, shelf).then(() => {
            book.shelf = shelf;

            if (this.props.addBook) {
                this.props.addBook(book)
                alert('Add to '+shelf)
            }
        })
    }

    render() {

        const { books } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handleSearch}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.length !== 0 && books.map((book) => {
                                return (
                                    <li key={book.id}>
                                        <BookItem book={book} onShelfChange={this.addToShelf}/>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;