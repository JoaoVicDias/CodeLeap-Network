import React from 'react'

import classes from './index.module.css'

const FilterItems = ({ label, filterName, onFilterHandler }) => (
    <div className={classes.div__filteritems__container}>
        <label> {label} </label>
        <input type="text" onChange={(event) => onFilterHandler(event, filterName)} />
    </div>
)


export default FilterItems