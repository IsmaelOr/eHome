'use client';

import Container from "@/app/[locale]/components/Container";
import Heading from "@/app/[locale]/components/Heading";
import SubHeading from "@/app/[locale]/components/SubHeading";
import ListingHead from "@/app/[locale]/components/listings/ListingHead";
import ListingInfo from "@/app/[locale]/components/listings/ListingInfo";
import ListingReservation from "@/app/[locale]/components/listings/ListingReservation";
import { categories } from "@/app/[locale]/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import {useRouter} from 'next-intl/client';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface CoHostProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const CoHost: React.FC<CoHostProps> = ({
    listing,
    reservations = [],
    currentUser
}) => { 
    return(
        <Container>
            <div className="flex flex-col gap-4">
                <Heading title="Invita a un Coanfitrión" subtitle="Un coanfitrión puede ayudarte en muchas actividades, desde administrar el calendario hasta recibir a los huéspedes."/>
                <hr/>
                <SubHeading title="Administrar Coanfitriones"/>
                <hr/>
            </div>
        </Container>
    )
}

export default CoHost;