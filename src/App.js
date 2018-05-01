import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import shelves from "./shelves";
import BookShelf from "./Components/BookShelf";
import SearchPage from './Pages/SearchPage'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }

  handleShelfChange = (book, shelf) => {

    BooksAPI.update(book, shelf).then(() => {
      this.setState((state) => {
        book.shelf = shelf;

        let preBooks = state.books;
        let newBooks;

        if (shelf === 'none') {
          newBooks = preBooks.filter((preBook) => {
            return preBook.id !== book.id;
          })
          alert(`Book: "${book.title}" removed!`)
        } else {
          newBooks = preBooks.map((preBook) => {
            return preBook.id === book.id ? book : preBook;
          })
        }
        return {
          books: newBooks
        }
      })
    })

  }

  handleAddBook = (book) => {
    this.setState((state) => {
      let preBooks = state.books;

      let books = preBooks.filter((preBook) => {
        return preBook.id !== book.id
      })

      return {
        books: books.concat([book])
      }
    })
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
        <Route exact path='/' render={() => {
          return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>{
                  shelves.map((shelf) => {
                    return shelf.value !== 'none' && (
                      <BookShelf key={shelf.value} shelf={shelf} books={books} onShelfChange={this.handleShelfChange} />
                    )
                  })
                }
                </div>
              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )
        }} />


        <Route path="/search" render={() => {
          return (
            <SearchPage addBook={this.handleAddBook} />
          )
        }}

        />
      </div>
    )
  }
}

export default BooksApp
