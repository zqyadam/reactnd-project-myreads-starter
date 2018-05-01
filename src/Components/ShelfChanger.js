import React, { Component } from 'react';
import shelves from "../shelves";



class ShelfChanger extends Component {

    handleShelfChange = (shelf) => {
        if (this.props.onShelfChange) {
            this.props.onShelfChange(shelf);
        }
    }

    render() {

        const { current} = this.props;

        return (
            <div className="book-shelf-changer">
                <select
                    onChange={(event) => {
                        this.handleShelfChange(event.target.value);
                    }}
                    defaultValue={current}
                >
                    <option value="none" disabled>Move to...</option>
                    {shelves.map((category)=>{
                        return (<option key={category.value} value={category.value} >{category.text}</option>)
                    })
                    }
                </select>
            </div>
        )
    }
}


export default ShelfChanger;