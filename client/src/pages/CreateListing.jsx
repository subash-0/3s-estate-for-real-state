import React from 'react'

const CreateListing = () => {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
            <input type="text" className='border p-3 rounded-lg' placeholder='Name' name="name" id="name" maxLength='62' minLength='10' required />
            <textarea type="text" className='border p-3 rounded-lg' placeholder='Description' id="description" required />
            <input type="text" className='border p-3 rounded-lg' placeholder='Address' name="name" id="name" maxLength='62' minLength='10' required />
            <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="sell" className='w-5' />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="rent" className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="parking" className='w-5' />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="furnished" className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="offer" className='w-5' />
                        <span>Offer</span>
                    </div>
            </div>
            <div className='flex flex-wrap gap-4 '>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="bedrooms" min='1' max='5'  />
                        <p>Beds</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="bathrooms" min='1' max='5' />
                        <p>Baths</p>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="regularPrice" />
                        <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span className='text-sm'>$/month</span>
                        </div>
                    </div>
                    <div className=" flex items-center gap-2">
                        <input type="number" className='p-3 w-20 border-gray-300 rounded-lg' name="" id="discountPrice" />   
                        <div className="flex flex-col items-center">
                        <p>Discount Price</p>
                        <span className='text-sm'>$/month</span>
                        </div>
                    </div>
                 
            </div>
            </div>
            <div className='flex flex-col flex-1 gap-4 '>
                <p className='font-semibold '>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max:6)</span>
                </p>
                <div className='flex gap-4'>
                    <input type="file" id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded-xl w-full' />
                    <button className='p-3 text-green-700  border border-green-700 rounded uppercase  hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>

            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing