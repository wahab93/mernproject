import React from 'react'

export const Banner = ({ userName, show }) => {
    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="banner">
                                <img src="/images/slider/banner-1.jpg" className="d-block w-100" alt="Banner" />
                                <div className='figcaption'>
                                    <h2>Welcome</h2>
                                    <p>{userName}</p>
                                    <p>{show ? 'Happy to see you Back' : 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
