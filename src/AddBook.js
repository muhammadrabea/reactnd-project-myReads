import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import Books from './Books'
import SortBy from 'sort-by'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class AddBook extends Component {
    static propTypes = {
        shelfBooks: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }
    state = {
        resaultBooks: [],
        query: ''
    }//updating the state query
    updateQuery = (event) => {
        this.setState({query: event.target.value});
        this.handleChange(event.target.value);
    }//Searching for the books according to the updated query in the API
    handleChange = (query) => {
        if (query.length <= 0) {
          this.setState({query: '', resaultBooks: []})
        } else {
          BooksAPI.search(query).then((resaultBooks) => {
            if (resaultBooks.error) {
              resaultBooks = []
            }
            const shelfBooks = this.props.shelfBooks;
            resaultBooks.map(book => shelfBooks.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf))
            this.setState({resaultBooks})
          })
        }
      }
    render() {
        return(
            <div>
                <div className='search-books-bar'>
                <Link className='close-search' to='/'>Close</Link>
                <div className='search-books-input-wrapper'>
                    <input
                            type='text'
                            value={this.state.query}
                            placeholder='Search For Your Book Here'
                            onChange={this.updateQuery}
                        />
                </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        <div className='bookshelf-books'>
                        <ol className='books-grid'>
                            {this.state.resaultBooks.sort(SortBy('title'))
                            .map(book => (
                                <Books 
                                onShelfChange={this.props.onShelfChange}
                                key={book.id}
                                book={book}
                                />
                            ))
                            }
                        </ol>
                        </div>
                    </ol>
                    </div>
                </div> 
        )
    }





}
export default AddBook