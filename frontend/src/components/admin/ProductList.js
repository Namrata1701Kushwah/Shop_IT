import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts, clearErrors, deleteProduct } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import Sidebar from './Sidebar'





const ProductList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state?.products);
    const {error:deleteErrror, isDeleted} = useSelector(state=>state.product)

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteErrror) {
            alert.deleteErrror(error);
            dispatch(clearErrors())
        }
        if(isDeleted){
            alert.success("Product Deleted Successfully")
            history.push("/admin/products")
            dispatch({type : 'DELETE_PRODUCT_RESET '})
        }

    }, [dispatch, alert, error ,deleteErrror, isDeleted, history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Prpce',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',

                },
            ],
            rows: []
        }
// console.log("pro",products.products);
        products?.products?.forEach(product => {
            data?.rows?.push({
                id: product?._id,
                name: product?.name,
                price: `$${product?.price}`,
                stock: product?.stock,
                actions:
                    <Fragment>
                        <Link to={`/admin/product/${product?._id}`} className="btn btn-primary py-1 px-2">
                            <i className='fa fa-pencil'></i>
                        </Link>

                        <button style={{marginLeft: "45px", marginTop: "-60px"}} className='btn btn-danger py-1 px-6 ml-7' onClick={()=>deleteProductHandler(product._id)} >
                            <i className='fa fa-trash'></i>
                        </button>
                    </Fragment>

            })
        })

        return data;
    }


    const deleteProductHandler = (id)=>{
        dispatch(deleteProduct(id))
    }
// console.log("KKKKKKKK",products);
    return (
        <Fragment>
            <MetaData title={'All Product'} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h1 className='my-5'>All Products</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>

                </div>

            </div>

        </Fragment>
    )
}


export default ProductList;