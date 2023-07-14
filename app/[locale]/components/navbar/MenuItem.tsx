'use client';

import Link from "next-intl/link";

interface MenuItemProps {
    onClick: () => void;
    route: string;
    modal?: boolean;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    route,
    modal,
    label
}) => {
    if(modal){
        return(
            <div 
                onClick={onClick}
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                    {label}
            </div>
        );
    }

    return(
        <Link href={route}>
            <div 
                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                    {label}
            </div>
        </Link>
    );

}

export default MenuItem;