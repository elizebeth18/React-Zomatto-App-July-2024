import React from 'react';
import {Link} from 'react-router-dom';

const ListingDisplay = (props) => {

    const renderData = ({restList}) => {
        if(restList){
            if(restList.length > 0) {
                return restList.map((item,index) => {
                    return(
                        <div className='item' key={item._id}>
                            <div className='col-md-5'>
                                <img className='Image' src={item.restaurant_thumb}
                                    alt={item.restaurant_name} />
                            </div>
                            <div className='col-md-7'>
                                <div className='hotel_name'>
                                    <Link to={`/details?restId=${item.restaurant_id}`}>
                                        {item.restaurant_name}
                                    </Link>
                                </div>
                                <div className='city_name'>{item.address}</div>
                                <div className='city_name'>{item.rating_text}</div>
                                <div className='city_name'>Rs. {item.cost}</div>
                                {/* add dynamic logic for meal_type and cuisine type */}
                                <div className='labelDiv'>
                                    {renderMealType(item.mealTypes)}
                                    {/* <span className='label label-primary'>
                                        {item.mealTypes[0].mealtype_name}
                                    </span>&nbsp;&nbsp;
                                    <span className='label label-danger'>
                                        {item.mealTypes[0].mealtype_name}
                                    </span> */}
                                </div>
                                <div className='labelDiv'>
                                    {renderCusineType(item.cuisines)}
                                    {/* <span className='label label-primary'>
                                        {item.cuisines[0].cuisine_name}
                                    </span>&nbsp;&nbsp;
                                    <span className='label label-danger'>
                                        {item.cuisines[0].cuisine_name}
                                    </span> */}
                                </div>

                            </div>
                        </div>
                    );
                })

            } else {
                return(
                    <h2>No Data As Per Filter</h2>
                );
            }
        }else{
            return(
                <div>
                    <h2>Loading...</h2>
                    <img src="images/loader.gif" alt="loader"/>
                </div>
            );
        }
    }

    const renderMealType = (mealTypes) => {
        if(mealTypes.length > 0){
            return mealTypes.map((item, index) => {
                let sClass = "";
                if(index%2 === 0) {
                    sClass = 'label label-primary';
                } else {
                    sClass = 'label label-danger';
                }
                return (
                    <>
                        <span className={sClass} key={Math.random(1)}>
                            {item.mealtype_name}
                        </span> &nbsp;&nbsp;
                    </>
                );
            })
        }
    }

    const renderCusineType = (cuisines) => {
        if(cuisines.length > 0){
            return cuisines.map((item, index) => {
                let sClass = "";
                if(index%2 === 0) {
                    sClass = 'label label-warning';
                } else {
                    sClass = 'label label-success';
                }
                return (
                    <>
                        <span className={sClass} key={Math.random()}>
                            {item.cuisine_name}
                        </span> &nbsp;&nbsp;
                    </>
                );
            })
        }
    }

    return (
        <div id="content">
            {renderData(props)}
        </div>
    );
}

export default ListingDisplay;