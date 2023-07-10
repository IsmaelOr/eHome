'use client';

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import {discounts} from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DiscountInput from "../inputs/DiscountInput";
import ReservationInput from "../inputs/ReservationInput";
import TypeInput from "../inputs/TypeInput";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineMeetingRoom } from "react-icons/md";
import {RiParentFill} from "react-icons/ri";

enum STEPS {
    CATEGORY = 0,
    TYPE = 1,
    LOCATION = 2,
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    FIRSTRESERVATION = 6,
    PRICE = 7,
    DISCOUNT = 8,
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

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
            guestCount: 1,
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

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');
    const discount = watch('discount');
    const weekDiscount = watch('weekDiscount');
    const monthlyDiscount = watch('monthlyDiscount');
    const firstReservation = watch('firstReservation');
    const type = watch('type');

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location]);


    const setCustomValue = (id: string, value:any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step != STEPS.DISCOUNT){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Property Created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong')
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const actionLabel = useMemo(() => {
        if(step == STEPS.DISCOUNT){
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step == STEPS.CATEGORY){
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="Which of these best describes your place?" subtitle="Pick a category"/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category == item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step == STEPS.TYPE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="What type of place will guests have?" subtitle="Describe your property"/>
                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                        <TypeInput 
                            onClick={(type) => setCustomValue('type', type)}
                            description={'Guest have the whole place to themselves.'}
                            selected={type=='An entire place'}
                            label={'An entire place'}
                            icon={AiOutlineHome}
                        />
                        <TypeInput 
                            onClick={(type) => setCustomValue('type', type)}
                            description={'Guest have their own room in a home, plus access to shared places.'}
                            selected={type=='A room'}
                            label={'A room'}
                            icon={MdOutlineMeetingRoom}
                        />
                        <TypeInput 
                            onClick={(type) => setCustomValue('type', type)}
                            description={'Guests sleep in a room or common area that may be shared with you or others.'}
                            selected={type=="A shared room"}
                            label={'A shared room'}
                            icon={RiParentFill}
                        />
                </div>
            </div>
        )
    }

    if(step == STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Where is your place located?" subtitle="Hel guests find you!"/>
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng}/>
            </div>
        );
    }
    
    if(step == STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share some basics about your place" subtitle="What amenities do you have?"/>
                <Counter title="Guests" subtitle="How many guests?" value={guestCount} onChange={(value) => setCustomValue('guestCount', value)}/>
                <hr />
                <Counter title="Rooms" subtitle="How many rooms?" value={roomCount} onChange={(value) => setCustomValue('roomCount', value)}/>
                <hr />
                <Counter title="Bathrooms" subtitle="How many bathrooms?" value={bathroomCount} onChange={(value) => setCustomValue('bathroomCount', value)}/>
            </div>
        );
    }

    if(step == STEPS.IMAGES){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add a photo of your place" subtitle="Show guests what your place looks like!"/>
                <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc}/>
            </div>
        );
    }

    if(step == STEPS.DESCRIPTION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="How would you describe your place?" subtitle="Short and sweet works best!"/>
                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr/>
                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step == STEPS.FIRSTRESERVATION){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Choose who to welcome for your first reservation" subtitle="After your first guest, anyone can book your place."/>
                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                    <ReservationInput 
                        onClick={(firstReservation) => setCustomValue('firstReservation', firstReservation)}
                        description={'Get reservation faster when you welcome anyone from the E-home community.'}
                        value={false}
                        selected={firstReservation==false}
                        label={'Any E-home guest'}                 
                    />
                    <ReservationInput 
                        onClick={(firstReservation) => setCustomValue('firstReservation', firstReservation)}
                        description={'For your first guest, welcome someone with a good track record on E-Home.'}
                        value={true}
                        selected={firstReservation==true}
                        label={'An experienced guest'}                 
                    />
                </div>
            </div>
        )
    }

    if(step == STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Now, set your price" subtitle="How much do you charge per night?"/>
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if(step == STEPS.DISCOUNT){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Add discounts" subtitle="Get reservations faster."/>
                <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto">
                        <DiscountInput 
                            onClick={(discount) => setCustomValue('discount', discount)}
                            description={'Offer 20% on your first 3 reservations'}
                            amount={20}
                            selected={discount==20}
                            label={'Promotion for new ad'}
                        />
                        <DiscountInput 
                            onClick={(weekDiscount) => setCustomValue('weekDiscount', weekDiscount)}
                            description={'For stays of 7 nights or more'}
                            amount={10}
                            selected={weekDiscount==10}
                            label={'Discount per week'}
                        />
                        <DiscountInput 
                            onClick={(monthlyDiscount) => setCustomValue('monthlyDiscount', monthlyDiscount)}
                            description={'For stays of 28 nights or more'}
                            amount={18}
                            selected={monthlyDiscount==18}
                            label={'Monthly discount'}
                        />
                </div>
            </div>
        )
    }

    return (
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
        title="eHome your home!"
        body={bodyContent}
        />
    );
}

export default RentModal;