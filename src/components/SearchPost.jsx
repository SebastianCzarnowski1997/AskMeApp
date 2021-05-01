import React from 'react'

const SeachPost = (props) => {
  const {searchFunc, searchInput} = props
  return(
    <div className="maininput">
        <form>
          <input
            value={searchInput}
            onChange={searchFunc}
            placeholder="Search Post"
            style={{marginRight: '5em'}}
          />
        </form>
    </div>
  );
};

export default SeachPost;