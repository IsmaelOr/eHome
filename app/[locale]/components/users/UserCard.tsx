'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import {format} from 'date-fns';
import Image from 'next/image'
import HeartButton from "../HeartButton";
import Button from "../Button";


interface UserCardProps{
    data: SafeUser;
}

const UserCard: React.FC<UserCardProps> = ({
    data
}) => {
    const router = useRouter();
    return(
        <div className="flex flex-row items-center border border-gray-300 rounded-lg p-4 gap-6">
                <div className="flex flex-col w-30">
                    <Image className="rounded-full" 
                    height={96}
                    width={96}
                    alt="Profile"
                    src={data.image || "/images/placeholder.jpg"}/>
                    <div className="font-bold">{data.name}</div>
                </div>
                <div className="flex flex-col w-70">
                    <div className="flex flex-col">
                        <div className="font-bold text-xl">92</div>
                        <div className="text-sm">Reviews</div>
                    </div>
                    <hr/>
                    <div className="flex flex-col">
                        <div className="font-bold text-xl">4.8</div>
                        <div className="text-sm">Rating</div>
                    </div>
                    <hr/>
                    <div className="flex flex-col">
                        <div className="font-bold text-xl">1</div>
                        <div className="text-sm">Years in E-home</div>
                    </div>
                </div>
        </div>
    )
}

export default UserCard;