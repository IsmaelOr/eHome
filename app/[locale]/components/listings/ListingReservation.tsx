'use client';

import {Range} from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps{
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    clean: boolean;
    disabled?: boolean;
    disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    dateRange,
    totalPrice,
    clean,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates
}) => {

    const currency = 'USD';
    const tarifaServicio = (totalPrice*16.3/100);
    let tarifaClean = 0
    let total = totalPrice + tarifaServicio;
    let Clean = (<div></div>);

    if(clean) {
        tarifaClean = totalPrice*10/100
        Clean = (
            <div className="
            p-4
            flex
            flex-row
            items-center
            justify-between
            text-md
            underline
            text-neutral-500
        ">
            <div>Tarifa por limpieza</div>
            <div>${tarifaClean.toFixed(2)} {currency}</div>
        </div>)
        total = total + tarifaClean;
    }

    return(
        <div className="
            bg-white
            rounded-xl
            border-[1px]
            border-neutral-200
            overflow-hidden
        ">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    ${price} {currency}
                </div>
                <div className="font-light text-neutral-600">
                    night
                </div>
            </div>
            <hr />
            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />

            <div className="p-4">
                <Button 
                    disabled={disabled}
                    label="Reserve"
                    onClick={onSubmit}
                />
            </div>
            <hr/>
            {Clean}
            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                text-md
                underline
                text-neutral-500
            ">
                <div>Tarifa por servicio e-Home</div>
                <div>${tarifaServicio.toFixed(2)} {currency}</div>
            </div>



            <div className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
            ">
                <div>
                    Total
                </div>
                <div>
                    ${total} {currency}
                </div>
            </div>
        </div>
    )
}

export default ListingReservation;