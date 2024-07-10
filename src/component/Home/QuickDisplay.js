import React from "react";
import { Link } from "react-router-dom";

const QuickDisplay = (props) => {

   const listMeal = ({mealData}) => {
    if ({mealData}) {
      const mData = props.mealData.map((item) => {
        return (
          <Link to="/" id={item.mealtype_id}>
            <div className="tileContainer">
                <div className="tileComponent1">
                    <img src={item.meal_image} alt={item.mealtype}/>
                </div>

                <div className="tileComponent2">
                    <div className="componentHeading1">
                        {item.mealtype}
                    </div>
                    <div className="componentHeading2">
                        {item.content}
                    </div>
                </div>

            </div>
          </Link>
        );
      });

      return mData;
    }
  };

  return (
    <>
        {listMeal(props.mealData)}
    </>);
};

export default QuickDisplay;
