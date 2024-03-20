import React, { useEffect, useState } from 'react'

export const Products = () => {
    const [data, setdata] = useState([])
    const [productcat, setProductcat] = useState([])
    const [productdata, setProductdata] = useState([])
    useEffect(() => {
        const getproducts = async () => {
            // getting the data from API
            const res = await fetch('/products')
            const data = await res.json();

            // find the duplicates and make them unique 
            const uniqlist = [...new Set(data.map((e) => {
                return e.pCategory;
            })), 'ALL']
            setProductcat(uniqlist)
            // check if the filtered products array is empty then send all data to the product data
            if (productdata.length === 0) {
                setProductdata(data)
            }
            setdata(data)
        }
        getproducts();
    }, [])
    // Filter Products
    // Filter Products
    const filterProducts = (cat) => {
        if(cat === 'ALL'){
            return setProductdata(data)
        }
        const updateList = data.filter((e) => {
            return e.pCategory === cat
        })
        setProductdata(updateList)
    }

    return (
        <>
            <div className="container my-5">
                <div className="row g-4">
                    <h1 className='text-center fw-bold'>Our Products</h1>
                    <div className="col-md-12 text-center">
                        {
                            productcat.map((e, i) => {
                                return (
                                    <>
                                        <button className="btn btn-outline-dark me-2 text-capitalize" onClick={() => filterProducts(e)} key={i}>
                                            {e}
                                        </button>
                                    </>
                                )
                            })
                        }
                    </div>
                    {
                        productdata.map((e, i) => {
                            const { pName, pTitle, pPrice } = e
                            return (
                                <>
                                    <div className="col-md-3" key={i}>
                                        <div className="card bg-light p-3">
                                        {/* <img src="/images/slider/banner-1.jpg" className="d-block w-100" alt="Banner" /> */}
                                            <img className='w-100 mb-3' style={{ objectFit: 'cover' }} height={200} src={process.env.REACT_APP_IMAGE_PATH + e.productImage} alt={pTitle} />
                                            <p className='text-capitalize m-0'>{pName}</p>
                                            <p>Rs. {pPrice}</p>
                                            <button className='btn btn-primary'>ADD TO CART</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
