'use client';

import Container from "@/app/[locale]/components/Container";
import Heading from "@/app/[locale]/components/Heading";
import SubHeading from "@/app/[locale]/components/SubHeading";
import Counter from "@/app/[locale]/components/inputs/Counter";
import Input from "@/app/[locale]/components/inputs/Input";
import InputEdit from "@/app/[locale]/components/inputs/InputEdit";
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useCountries from "@/app/hooks/useCountries";
import Carrousel from "@/app/[locale]/components/inputs/Carrousel";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface EditDetailsProps{
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser: SafeUser | null;
}

const EditDetails: React.FC<EditDetailsProps> = ({
    listing,
    reservations = [],
    currentUser
}) => { 

    const {getByValue} = useCountries();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            type: '',
            location: null,
            guestCount: listing.guestCount,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: "",
            description: "",
            discount: 0,
            weekDiscount: 0,
            monthlyDiscount: 0,
            firstReservation: false,
        }
    });

    

    const guestCount = watch('guestCount');


    const setCustomValue = (id: string, value:any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }


    
    return(
        <Container>
            <div className="flex flex-col gap-4">
                <Heading title="Información del alojamiento" subtitle="Modifica los detalles de tu propiedad"/>
                <hr/>
                <SubHeading title="Fotos"/>
                <Carrousel image={listing.imageSrc}/>
                <hr/>
                <SubHeading title="Información básica del anuncio"/>
                <InputEdit title="Título del anuncio" value={listing.title} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Descripción del alojamiento" value={listing.description} onClick={() => {}}/>
                <hr/>
                <Counter title="Número de participantes" value={guestCount} onChange={(value) => setCustomValue('guestCount', value)} styleEdit/>
                <hr/>
                <InputEdit title="Enlace personalizado" value={false ? listing.id : 'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Idiomas" value={false ? listing.id : 'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Estado del anuncio" value={true ? 'Publicado - Los viajeros pueden reservar y encontrar tu lugar' : 'No publicado - Los viajeros no pueden reservar ni encontrar tu alojamiento en los resultados de búsqueda'} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Servicios"/>
                <hr/>
                <SubHeading title="Ubicación"/>
                <hr/>
                <InputEdit title="Dirección" value={`${getByValue(listing.locationValue)?.region}, ${getByValue(listing.locationValue)?.label}`} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Descripción de la zona" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Cómo moverse por la zona" value={'Sin especificar'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Compartir la ubicación" value={'Ubicación general'} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Vistas panorámicas" onClick={() => {}}/>
                <hr/>
                <SubHeading title="Propiedad y habitaciones"/>
                <hr/>
                <InputEdit title="Tipo de propiedad" value={listing.type} onClick={() => {}}/>
                <hr/>
                <InputEdit title="Habitaciones y espacios" 
                           value={`Recámaras: ${listing.roomCount}`} value2={`Baños: ${listing.bathroomCount}`}
                           onClick={() => {}}/>
                <hr/>
                <InputEdit title="Categorías" value={listing.type} onClick={() => {}}/>
                <hr/>
                <SubHeading title="Accesibilidad" edit onClick={() => {}}/>
                <hr/>
                <SubHeading title="Seguridad de los huéspedes" edit onClick={() => {}}/>
                <hr/>
            </div>
        </Container>
    )
}

export default EditDetails;