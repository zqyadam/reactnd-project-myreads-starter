import React, { Component } from 'react';
import ShelfChanger from "./ShelfChanger";


class BookItem extends Component {
    state = {}

    handleShelfChange = (shelf) => {
        if (this.props.onShelfChange) {
            this.props.onShelfChange(this.props.book, shelf)
        }
    }
    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail :'https://via.placeholder.com/128x193?text=No+Thumbnail'})` }}></div>
                    <ShelfChanger current={book.shelf} onShelfChange={this.handleShelfChange} />
                </div>
                {
                    book.title && <div className="book-title">{book.title}</div>
                }
                {
                    book.authors && <div className="book-authors">{book.authors.join(' , ')}</div>
                }

            </div>
        );
    }
}

export default BookItem;