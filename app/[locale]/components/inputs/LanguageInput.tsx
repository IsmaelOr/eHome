'use client';

interface LanguageInputProps{
    label: string;
    region: string;
    id:string;
    selected?: boolean;
    onClick: (value: string) => void;
}

const LanguageInput: React.FC<LanguageInputProps> = ({
    label,
    region,
    id,
    selected,
    onClick
}) => {
    return (
        <div onClick={() => onClick(id)} className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            hover:border-black
            transition
            cursor-pointer
            items-center
            justify-center
            ${selected ? 'border-black' : 'border-neutral-200'}
        `}>
            <div className="font-semibold">
                {label}
            </div>
            <div>
                {region}
            </div>
        </div>
    );
}

export default LanguageInput;