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

        search(query.trim()).then((books) => {
            if (!Array.isArray(books)) return;
            books.forEach(this.setBookShelf);

            this.setState({
                books: books
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
                alert('Add to ' + shelf)
            }
        })
    }

    setBookShelf = (book) => {
        const { shelfBooks } = this.props;
        for (let shelfBook of shelfBooks) {
            console.log(shelfBook)
            if (shelfBook.id === book.id) {
                book.shelf = shelfBook.shelf;
                return ;
            }
        }
        book.shelf = 'none';
    }

    render() {

        const { books } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
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
                                        <BookItem book={book} onShelfChange={this.addToShelf} />
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