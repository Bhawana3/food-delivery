import React from 'react';
import ReactPaginate from 'react-paginate';
import './styles.css';

const Pagination = (props) => { 
    return (
        <div style={{ display: 'flex' }}>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(event) => props.handlePageChange(event.selected)}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Pagination;