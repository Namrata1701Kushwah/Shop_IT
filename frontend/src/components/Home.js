import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import Pagination from "react-js-pagination";
// import ReactPaginate from 'react-paginate';


import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from "../actions/productActions";
import { useAlert } from "react-alert";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)
const Home = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)
    console.log("999999999999999999999999", category)

    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
    ]




    // console.log(currentPage)
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, resPerPage, productsCount, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword


    useEffect(() => {
        if (error) {

            return alert.error(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));
        console.log("3444444444444444", price);


    }, [dispatch, alert, error, currentPage, keyword, price, category, rating])


    const setCurrentPageNo = (PageNumber) => {
        setCurrentPage(PageNumber)
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }


    return (

        <Fragment> {/*TODO*/}
            {loading ? <h1>Loading...</h1> : (
                <Fragment>

                    <MetaData title={'Buy Best Products Online'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5" >
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-3" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    categories
                                                </h4>

                                                <ul className="pl-0">
                                                    {categories?.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)
                                                            }
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>

                                            <hr className="my-5" />
                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1]?.map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)
                                                            }
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >

                                                                </div>

                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>

                                            </div>





                                        </div>

                                    </div>

                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products?.map(product => (
                                                <Product key={product?._id} product={product} col={4} />
                                            ))}
                                        </div>

                                    </div>
                                </Fragment>
                            ) : (
                                products?.map(product => (
                                    <Product key={product?._id} product={product} />
                                ))


                            )}





                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">

                            <Pagination

                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                firstPageText={'First'}
                                lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />


                        </div>
                    )}


                </Fragment>
            )}

        </Fragment>
        
    )
}


export default Home;