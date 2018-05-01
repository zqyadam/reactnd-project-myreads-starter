import React, { Component } from 'react';
import BookItem from "./BookItem";


class BookShelf extends Component {
    state = {}

    handleShelfChange = (book, shelf) => {
        this.props.onShelfChange(book, shelf)
    }

    render() {
        const { shelf, books } = this.props;
        const thisShelfBooks = books.filter((book) => {
            return book.shelf === shelf.value
        })
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.text}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        thisShelfBooks.map((book) => {
                            return (
                                <li key={book.id}>
                                    <BookItem book={book} onShelfChange={this.handleShelfChange}/>
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

export default BookShelf;
