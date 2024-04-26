import Style from './Button.module.css';
const Button = ({btnName , handleCLick , classStyles}) => (
  <button className={Style.button} type = "button" onClick={handleCLick}>
    {btnName} 
  </button>
)

export default Button;
