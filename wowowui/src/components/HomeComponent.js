import React from 'react';

function Home(props){
    return(
        <div className="container">
            <form className="input-container">
                <i className="fa fa-search fa-lg icon"></i>
                <input type="text" className="search-bar" name="search" placeholder="Search.." />
                <button type="submit" class="searchButton"><b>Search</b></button>
            </form>
        </div>
    );
}

export default Home;