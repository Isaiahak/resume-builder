import { useState, useEffect } from "react";

type Props = {
	onStartChange: (date: Date) => boolean;
	onEndChange: (date: Date) => boolean;
};

const months = [
	"January", "February", "March", "April",
	"May", "June", "July", "August",
	"September", "October", "November", "December",
];

const daysInMonth: Record<string, number> = {
	January: 31, February: 29, March: 31, April: 30,
	May: 31, June: 30, July: 31, August: 31,
	September: 30, October: 31, November: 30, December: 31,
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i);

type ScrollColumnProps = {
	items: (string | number)[];
	selected: string | undefined;
	onSelect: (val: string) => void;
	width?: string;
};

function ScrollColumn({ items, selected, onSelect, width = "w-28" }: ScrollColumnProps) {
	return (
		<div className={`${width} flex flex-col overflow-y-auto h-32 no-scrollbar border border-white/[0.08] rounded-sm bg-white/[0.02] items-center`}>
			{items.map((item) => {
				const val = String(item);
				const isSelected = selected === val;
				return (
					<button
						key={val}
						type="button"
						onClick={() => onSelect(val)}
						className={`px-3 py-1.5 text-left font-mono text-xs tracking-wide transition-all duration-150 shrink-0 cursor-pointer
							${isSelected
								? "text-white/80"
								: "text-white/30 hover:text-white/60 "
							}`}
					>
						{item}
					</button>
				);
			})}
		</div>
	);
}

type DateRowProps = {
	label: string;
	day: string | undefined;
	month: string | undefined;
	year: string | undefined;
	setDay: (v: string) => void;
	setMonth: (v: string) => void;
	setYear: (v: string) => void;
};

function DateRow({ label, day, month, year, setDay, setMonth, setYear }: DateRowProps) {
	const dayCount = month ? daysInMonth[month] : 31;
	const days = Array.from({ length: dayCount }, (_, i) => i + 1);

	return (
		<div className="flex flex-col gap-2">
			<span className="text-xs tracking-widest text-center uppercase text-white/30 font-mono">{label}</span>
			<div className="flex gap-2">
				<ScrollColumn items={months} selected={month} onSelect={setMonth} width="w-32" />
				<ScrollColumn items={days} selected={day} onSelect={setDay} width="w-16" />
				<ScrollColumn items={years} selected={year} onSelect={setYear} width="w-20" />
			</div>
			{/* Selected display */}
			<span className="font-mono text-xs text-white/20 tracking-wide h-4">
				{month && day && year ? `${month} ${day}, ${year}` : ""}
			</span>
		</div>
	);
}

export default function DateSelector({ onStartChange, onEndChange }: Props) {
	const [startDay, setStartDay] = useState<string>();
	const [startMonth, setStartMonth] = useState<string>();
	const [startYear, setStartYear] = useState<string>();
	const [endDay, setEndDay] = useState<string>();
	const [endMonth, setEndMonth] = useState<string>();
	const [endYear, setEndYear] = useState<string>();

	useEffect(() => {
		if (startDay && startMonth && startYear) {
			const result = onStartChange(new Date(`${startMonth} ${startDay}, ${startYear}`));
			if (result){
				console.log("can change");
			} else {
				console.log("cannot change");
			}
		}
	}, [startDay, startMonth, startYear]);

	useEffect(() => {
		if (endDay && endMonth && endYear) {
			const result = onEndChange(new Date(`${endMonth} ${endDay}, ${endYear}`));
			if (result){
				console.log("can change");
			}else {
				console.log("cannot change");
			}
		}
	}, [endDay, endMonth, endYear]);

	return (
		<div className="flex gap-6">
			<DateRow
				label="Start Date"
				day={startDay} month={startMonth} year={startYear}
				setDay={setStartDay} setMonth={setStartMonth} setYear={setStartYear}
			/>
			<DateRow
				label="End Date"
				day={endDay} month={endMonth} year={endYear}
				setDay={setEndDay} setMonth={setEndMonth} setYear={setEndYear}
			/>
		</div>
	);
};
