import type { ReactElement } from "react";

type Variants = 'primary' | "secoundary"
export interface ButtonProps{ 
    variant:Variants;
    size:'sm' | 'md' | 'lg';
    text:string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick:()=>void;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secoundary":"bg-purple-300 text-purple-500"
}
const sizeStyles ={
    "sm":"py-1 px-2",
    "md": "py-2 px-4",
    "lg":" px-4 px-6"
}
const defaultStyles = 'rounded-md flex'
export const Button = (props:ButtonProps) =>{
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
       {props.startIcon} {props.text} {props.endIcon}
       </button>
}

<Button variant="primary" size="lg" text="as" onClick={()=>{}}></Button>