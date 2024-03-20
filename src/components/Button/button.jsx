import React from "react";
import "./button.css";
const Button = (props) => {
   return (
      <div>
         <div>
            <button class="button-74" role="button">
               {props.text}
            </button>
         </div>
      </div>
   );
};

export default Button;
