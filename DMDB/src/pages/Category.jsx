import { Link, useParams } from "react-router-dom"
import useFetchData from "../utils/api"
import { useEffect } from "react"
import Card from "../components/Card"
import Hero from "../components/Hero"
import genres from "../utils/genres"
import {IoIosArrowBack} from 'react-icons/io'

const Category = () => {
    const {category} = useParams()
    const {data,loading} = useFetchData(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${category}`)

    useEffect(()=>{
      window.scrollTo(0,0)
    },[])
    useEffect(()=>{
        console.log(data,'Categories')
    },[data])

  return (
    <div className=' min-h-screen text-white  container md:px-11 mx-auto h-full pt-[110px]'>

      <div className="mb-9">
        <div className=" flex items-center pb-9 text-2xl ">
          <Link to={'/'} className="cursor-pointer hover:text-blue-400">
            <IoIosArrowBack/>
          </Link>
            <div className=" mx-auto h-full flex items-center">
            <h1 className=" text-center text-4xl  font-bold   ">{genres.genres.find((item)=>item.id === parseInt(category))?.name}</h1>
            </div>
        </div>
            <Hero popular={data?.results} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5  gap-12 text-white justify-items-center flex-wrap justify-center ">
      {data?.results.map((item)=>{
      return(
        <Card movie={item} key={item.id}/>
      )
    }
    )}
    
    </div>
    </div>
  )
}

export default Category