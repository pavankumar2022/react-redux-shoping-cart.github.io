const { createSlice } = require('@reduxjs/toolkit');
//const {  createAsyncThunk } = require('@reduxjs/toolkit');

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },


   //BELOW SYNTAX OF REDUX TOOLKIT//BETTER ERROR HANDLING
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchProducts.pending, (state, action) => {
    //             state.status = STATUSES.LOADING;
    //         })
    //         .addCase(fetchProducts.fulfilled, (state, action) => {
    //             state.data = action.payload;
    //             state.status = STATUSES.IDLE;
    //         })
    //         .addCase(fetchProducts.rejected, (state, action) => {
    //             state.status = STATUSES.ERROR;
    //         });
    // },
});

// Thunks //ITS A MIDDLEWARE //THUNKS A FUNCTION WHICH RETURNS A FUNCTION 
// export const fetchProducts = createAsyncThunk('products/fetch', async () => {
//     const res = await fetch('https://fakestoreapi.com/products');
//     const data = await res.json();
//     return data;
// }) 
//NORMAL THUNKS WAYS....// Thunks //ITS A MIDDLEWARE //THUNKS A FUNCTION WHICH RETURNS A FUNCTION 
//fetch data using thunks and store in redux

//thunks
export function fetchProducts() {
    return async function fetchProductThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING));
        try {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            dispatch(setProducts(data));
            dispatch(setStatus(STATUSES.IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(STATUSES.ERROR));
        }
    };
}

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer; 

