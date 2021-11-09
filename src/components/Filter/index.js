import React from 'react'

import FilterItems from '../FilterItems'

import classes from './index.module.css'

const Filter = ({ filterConfigs, onFilterHandler }) => (
    <div className={classes.div__filter__container}>
        {
            filterConfigs.map((filterConfig) => (
                <FilterItems key={filterConfig.filterName} {...filterConfig} onFilterHandler={onFilterHandler} />
            ))
        }
    </div>
)

export default Filter