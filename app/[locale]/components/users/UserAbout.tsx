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
import {MdOutlineWorkOutline,MdOutlineFreeBreakfast, MdOutlineGTranslate,MdRoomService, MdLocationPin, MdOutlinePets} from "react-icons/md";
import {FcIdea} from "react-icons/fc";
import {BiTime, BiBookOpen, BiMusic} from "react-icons/bi";
import {FaBirthdayCake, FaHeart, FaLightbulb} from "react-icons/fa";

interface UserAboutProps{
    data: SafeUser;
}

const userAbout = {
    work: 'Engineering',
    funfact: 'I love basketball',
    pets: "I don't have it, but I love it",
    spendtime: "Taking Care of Blessing",
    biography: "A multiple and tireless human being",
    live: "Mexico",
    song: "Watermelon Sugar",
    guestAtention: "Give tips and talk about existence",
    born: "25/03/2000",
    obsessed: "Videogrames and chatting",
    languages: "English and Spanish",
    breakfast: "Juice, Bread & Fruits"
}

const UserAbout: React.FC<UserAboutProps> = ({
    data
}) => {
    const router = useRouter();

    return(
        <div className="flex flex-col border border-gray-300 rounded-lg p-4 gap-6">
            <div className="font-bold text-xl">About {data.name}</div>
            <div className="flex flex-row justify-evenly">
                <div className="flex flex-col gap-3" style={{ flexBasis: '50%' }}>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlineWorkOutline/>
                        <div>My Work: {userAbout.work}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <FaLightbulb/>
                        <div>Fun fact: {userAbout.funfact}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlinePets/>
                        <div>Pets: {userAbout.pets}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <BiTime/>
                        <div>I spend too muuch time: {userAbout.spendtime}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <BiBookOpen/>
                        <div>My biografhy title: {userAbout.biography}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdLocationPin/>
                        <div>Live in {userAbout.live}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-3" style={{ flexBasis: '50%' }}>
                    <div className="flex flex-row gap-3 items-center">
                        <BiMusic/>
                        <div>Favorite song in high school: {userAbout.song}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdRoomService/>
                        <div>For guest, I always: {userAbout.guestAtention}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <FaBirthdayCake/>
                        <div>Born on {userAbout.born}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <FaHeart/>
                        <div>I'm obsessed with: {userAbout.obsessed}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlineGTranslate/>
                        <div>Speaks: {userAbout.languages}</div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <MdOutlineFreeBreakfast/>
                        <div>What's for breakfast: {userAbout.breakfast}</div>
                    </div>
                </div>
            </div>
            <div>I am a journalist and actor, and in May 2019 I created the vegan brand BENEÇÃO Brasil, with an artisanal factory, store, restaurant and energizing spa. I live in the same house, where I have three bedrooms for hosting. Would you like to be in a vegan place with natural products, tasty food, and an energy proposal? Welcome</div>
        </div>
    )
}

export default UserAbout;