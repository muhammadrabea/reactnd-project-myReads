import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksList from './BooksList'
import {Route, Link} from 'react-router-dom'
import AddBook from './AddBook'
class BooksApp extends React.Component {
  state={
    books: [],
  }
  //Setting a function to maintain the book's shelf
  shelfChange = (book, shelf) => {
    BooksAPI.update(book,shelf).then(() => {
      book.shelf= shelf;
      this.setState(state => ({
        books: state.books.filter((b) => b.id !== book.id).concat([book])
      }));
    });
  }
  
    //Geting the data from the API
      componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })

    }

  render() {
    return(
      <div>
        <Route exact path='/' render={() => (  //Responsible for routing to home page
          <div className='shelves-list'>
             <h1 className='list-books-title'>My Reads</h1>
            <BooksList 
            shelfBooks={this.state.books}
            onShelfChange={this.shelfChange}
          />
            <div className='open-search'>
              <Link to='/search'><button>Add A Book</button></Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={() => ( //Responsible for routing to the Search page
          <AddBook shelfBooks={this.state.books} onShelfChange = {this.shelfChange}/>
        )}/>
      </div>
    )
  };
}
export default BooksApp
