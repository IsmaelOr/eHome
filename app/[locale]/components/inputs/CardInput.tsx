'use client';
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Button from "../Button";

interface CardInputProps{
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    value: string;
    instructions?: string;
    cancelAction: () => void;
}

const CardInput: React.FC<CardInputProps> = ({
    id,
    label,
    value,
    instructions,
    type,
    disabled,
    cancelAction
}) => {
    const [initialValue, setInitialValue] = useState(value);
    return(
        <div className="w-full relative p-6 border-2 rounded-md">
            <p className="text-md font-bold mb-1">{label}</p>
            <p className="text-sm mb-5">{instructions}</p>
            <input 
                id={id}
                defaultValue={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                disabled={disabled}
                placeholder=" "
                type={type}
                className={`
                    peer
                    w-full
                    p-4
                    mb-5
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    pl-4
                    border-neutral-300'
                    focus:border-black'
                `}
            />
            <hr className="mb-5"/>
            <div className="flex flex-row justify-between items-center">
                <p onClick={cancelAction} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-md hover:bg-neutral-100 underline transition cursor-pointer">Cancelar</p>
                <button onClick={() => {}} className="rounded-lg bg-green-500 text-white border-green-500 border-2 px-2 py-1"> Guardar </button>
            </div>
        </div>
    );
}

export default CardInput;