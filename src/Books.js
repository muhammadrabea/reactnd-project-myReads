import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }
    //Changing the book shelf according to the user's selection
    handleChange = (event) => {
        this.changeShelf(event.target.value)
    }
    //Passing the changes to the parent
    changeShelf = (shelf) => {
        this.props.onShelfChange(this.props.book, shelf);
    }
    render() {
        const {book} = this.props;
        return(
            <div className='book'>
                <div className='book-top'>
                    <div className='book-cover' 
                         style={{ 
                             height: 193,
                             width: 128, 
                             backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail: ''})` 
                             }}>
                    </div>
                    <div className='book-shelf-changer'>
                        {/* setting the default Value to none and alters according to the user's selection*/}
                        <select defaultValue={book.shelf ? book.shelf: 'none'} onChange={this.handleChange} >
                        <option value='' disabled>Move to...</option>
                        <option value='read'>Read</option>
                        <option value='currentlyReading'>Currently Reading</option>
                        <option value='wantToRead'>Want to Read</option>
                        <option value='none'>None</option>
                        </select>
                    </div>
                </div>
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>{book.authors}</div>
                </div>
        )
    }
}



export default Books