import React, {Component} from 'react'
import Books from './Books'
import SortBy from 'sort-by'
import PropTypes from 'prop-types'

class BooksList extends Component {
    static propTypes= {
        onShelfChange: PropTypes.func.isRequired,
        shelfBooks: PropTypes.array.isRequired
    }
    
    render() {
        const shelves = ['read','currentlyReading','wantToRead'];
        const shelfTitle= ['Read','Currently Reading','Want to Read'];
        const {shelfBooks} = this.props;
        return (
            <div className='list-books-content'>
                {shelves.map((shelf, index) => (
                    <div key={index} className='bookshelf'>
                        <div className='bookshelf-title'>
                            <h2 className=''>{shelfTitle[index]}</h2>
                            <div className='bookshelf-books'>
                                <ol className='books-grid'>
                                    {shelfBooks.sort(SortBy('title')) //Displaying the Filtered books according to their shelf
                                    .filter((book) => book.shelf === shelf).map(book =>  (
                                        <li key={book.id}>
                                            <Books
                                                onShelfChange={this.props.onShelfChange}
                                                book={book}
                                            />
                                        </li>  
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    
    };
}

export default BooksList