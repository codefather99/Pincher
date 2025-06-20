import { Helmet } from 'react-helmet-async'

import React from 'react'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
     <title>{title}</title>  
     <meta name='description' content={description} />
     <meta name='keywords' content={keywords}/>
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to Pincher',
    description: 'We sell the best products',
    keywords: 'electronics, buy electronics, cheap electronics',
}

export default Meta