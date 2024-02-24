import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { ListingComponent, Loading } from '../components';
const SearchPage = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setshowMore] = useState(false);
    const [sideBarData, setsideBarData] = useState({
        searchTerm:'',
        type:'all',
        parkings:false,
        furnished:false,
        offer:false,
        sort:'createdAt',
        order:'desc',
        status:false,
    })
    useEffect(() => {
            const urlParams = new URLSearchParams(location.search);
            const searchTermURL = urlParams.get('searchTerm',sideBarData.searchTerm)
            const typeUrl =urlParams.get('type',sideBarData.type)
            const parkingsUrl = urlParams.get('parkings',sideBarData.parkings)
            const furnishedUrl =urlParams.get('furnished',sideBarData.furnished)
            const offerUrl =urlParams.get('offer',sideBarData.offer)
            const sortUrl =urlParams.get('sort',sideBarData.sort)
            const orderUrl =urlParams.get('order',sideBarData.order)
            const statusUrl =urlParams.get('status',sideBarData.status)
            if(searchTermURL ||
                typeUrl ||
                parkingsUrl ||
                furnishedUrl ||
                offerUrl || 
                sortUrl ||
                orderUrl || statusUrl ){
                    setsideBarData({
                        searchTerm:searchTermURL || '',
                        type:typeUrl || 'all',
                        furnished:furnishedUrl==='true'?true :false,
                        parkings:parkingsUrl === 'true'?true : false,
                        offer:offerUrl === 'true'?true :false,
                        status:statusUrl === 'true'?true :false,
                        sort:sortUrl || 'createdAt',
                        order:orderUrl || 'desc'
                        
                        
                    }) }

        const fetchListings = async()=>{
            setLoading(true);
            setshowMore(false)
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/v1/listing/getall?${searchQuery}`);
            const data = await res.json();
            if(data.success = false){
                return;
            }
            if(data?.length >4){
                setshowMore(true)
            }
            console.log(data)
            setListings(data);
            setLoading(false);

        }

        fetchListings();

    }, [location.search])
    
    const handleChage=(e)=>{
        if(e.target.id === 'all'|| e.target.id === 'rent' || e.target.id === 'sale'){
            setsideBarData({...sideBarData, type:e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setsideBarData({...sideBarData,searchTerm:e.target.value});
            
        }
        if(e.target.id === 'parkings' || e.target.id === 'offer' || e.target.id === 'furnished' || e.target.id === 'status' ){
            setsideBarData({...sideBarData, [e.target.id]:e.target.checked || e.target.checked === 'true'? true : false})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setsideBarData({...sideBarData,sort,order});
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm',sideBarData.searchTerm)
        urlParams.set('type',sideBarData.type)
        urlParams.set('parkings',sideBarData.parkings)
        urlParams.set('furnished',sideBarData.furnished)
        urlParams.set('offer',sideBarData.offer)
        urlParams.set('sort',sideBarData.sort)
        urlParams.set('order',sideBarData.order)
        urlParams.set('status',sideBarData.status)

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)

    }

const fetMoreData= async ()=>{
    const numberOfListings = listings?.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    setLoading(true);
    const res = await fetch(`/api/v1/listing/getall?${searchQuery}`);
    const data = await res.json();
    if(data.length <4){
        setshowMore(false);
    }
    setListings([...listings,...data])
    setLoading(false);
}


  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border border-b-2 shadow-sm md:border-r-2 md:min-h-screen md:max-w-min">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8' >
                <div className="flex items-center gap-2">
                    <input type="text" id='searchTerm' placeholder='Search .....'
                    value={sideBarData.searchTerm}
                    onChange={handleChage}
                    className='border rounded-lg p-2 w-full' />
                </div>
                <div className='flex gap-2 flex-wrap items-center  '>
                    <label className='font-semibold'>Types:</label>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='all'
                        onChange={handleChage}
                        checked={sideBarData.type==='all'}
                        className='w-5'/>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent'
                        onChange={handleChage}
                        checked={sideBarData.type==='rent'}
                        className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale'
                        onChange={handleChage}
                        checked={sideBarData.type==='sale'}
                        className='w-5'/>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='offer'
                        onChange={handleChage}
                        checked={sideBarData.offer}
                        className='w-5'/>
                        <span>Offer</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='status'
                        onChange={handleChage}
                        checked={sideBarData.status}
                        className='w-5'/>
                        <span>status</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center  '>
                    <label className='font-semibold'>Facilities:</label>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='parkings'
                        onChange={handleChage}
                        checked={sideBarData.parkings}
                        className='w-5'/>
                        <span>WI-FI</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished'
                        onChange={handleChage}
                        checked={sideBarData.furnished}
                        className='w-5'/>
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Sort:</label>
                    <select  id="sort_order" className='border rounded-lg p-2 bg-transparent'
                    onChange={handleChage}
                    defaultValue={'createdAt_desc'}
                    >
                        <option value="regularPrice_desc">Price High to Low</option>
                        <option value="regularPrice_asc">Price Low to High</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Old</option>

                    </select>
                </div>
                <button className='w-full rounded-lg bg-slate-700 text-white uppercase hover:opacity-90 p-2'>Search</button>
            </form>
        </div>
        <div className="flex-1 w-full p-3">
            <h1 className='text-2xl font-semibold border-b p-3 text-slate-700 mt-1 w-full' >Search Results:</h1>
            
            <div className=" py-7 flex gap-3 justify-center flex-wrap">
           
                {!loading && listings?.length <1 && (
                    <p className='text-center text-slate-700'>No Listing Found !</p>
                )}
                {
                    loading &&  <Loading />
                }
                {
                    !loading && listings && listings?.map((list,i)=>(
                        <ListingComponent key={i} list={list} />
                    ))
                }

            </div>
            {
                showMore && 
                <button className='text-green-700 hover:underline text-center w-full' 
                        onClick={fetMoreData}>
                    Show more
                </button>
            }
        </div>
    </div>
  )
}

export default SearchPage