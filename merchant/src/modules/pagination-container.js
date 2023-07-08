import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const PaginationContainer = () => {
    const {page, num0fpages, changePage} = useAppContext();
    
    const nextPage = () =>{
        let newPage = page + 1;
        if(newPage > num0fpages){
            newPage = 1
        }
        changePage(newPage)
        console.log("Next Page", newPage);
    }

    const previousPage = () =>{
        let newPage = page - 1;
        if(newPage < 1){
            newPage = num0fpages
        }
        changePage(newPage)
        console.log("previous Page", newPage);
    }
    
    const pages  = Array.from({length: num0fpages},(_,index)=>{
        return index + 1
    });
    
    useEffect(() => {
    }, [])
   
    

    return (
        <div className='d-block'>
            <Pagination className='flex-wrap'>
                <PaginationItem>
                    <PaginationLink previous onClick={previousPage} />
                </PaginationItem>
                {pages.map((pageNumber)=>{
                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink className={pageNumber === page? "active" : ""} onClick={()=>changePage(pageNumber)}>
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}
                <PaginationItem>
                    <PaginationLink next onClick={nextPage} />
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default PaginationContainer