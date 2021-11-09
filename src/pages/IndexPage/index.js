import React from 'react'

import brandImg from '../../assets/img/codeleap_brand.png'

import classes from './index.module.css'

const IndexPage = () => {

    return (
        <div className={classes.div__indexpage__container}>
            <img src={brandImg} alt='CodeLeap brand' loading='lazy' />
        </div>
    )
}

export default IndexPage