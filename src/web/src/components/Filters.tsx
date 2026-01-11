import { useState, useEffect, useRef } from "react";
import type { ApiArtist, Relation } from "../services/api";
import "./Filters.css";

interface FiltersProps {
	artists: ApiArtist[];
	relations: Relation[];
	onFilterChange: (filtered: ApiArtist[]) => void;
}

interface FilterState {
	creationYear: string;
	firstAlbumYear: string;
	memberCount: string;
	location: string;
}

interface DropdownProps {
	label: string;
	value: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
	placeholder: string;
}

function Dropdown({
	label,
	value,
	options,
	onChange,
	placeholder,
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setSearchTerm("");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const filteredOptions = options.filter((opt) =>
		opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const selectedOption = options.find((opt) => opt.value === value);

	return (
		<div className="dropdown-container" ref={dropdownRef}>
			<label className="dropdown-label">{label}</label>
			<div
				className={`dropdown-trigger ${isOpen ? "open" : ""} ${value ? "has-value" : ""}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className={value ? "selected-value" : "placeholder"}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
			</div>
			{isOpen && (
				<div className="dropdown-menu">
					{options.length > 10 && (
						<div className="dropdown-search">
							<input
								type="text"
								placeholder="Search..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onClick={(e) => e.stopPropagation()}
								autoFocus
							/>
						</div>
					)}
					<div className="dropdown-options">
						<div
							className={`dropdown-option ${!value ? "selected" : ""}`}
							onClick={() => {
								onChange("");
								setIsOpen(false);
								setSearchTerm("");
							}}
						>
							{placeholder}
						</div>
						{filteredOptions.map((option) => (
							<div
								key={option.value}
								className={`dropdown-option ${value === option.value ? "selected" : ""}`}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
									setSearchTerm("");
								}}
							>
								{option.label}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

function Filters({ artists, relations, onFilterChange }: FiltersProps) {
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState<FilterState>({
		creationYear: "",
		firstAlbumYear: "",
		memberCount: "",
		location: "",
	});

	// Get unique creation years
	const creationYears = [...new Set(artists.map((a) => a.creationDate))].sort(
		(a, b) => a - b,
	);
	const creationYearOptions = creationYears.map((year) => ({
		value: year.toString(),
		label: year.toString(),
	}));

	// Get unique first album years
	const firstAlbumYears = [
		...new Set(
			artists.map((a) => parseInt(a.firstAlbum.split("-")[2] || "0")),
		),
	].sort((a, b) => a - b);
	const firstAlbumYearOptions = firstAlbumYears.map((year) => ({
		value: year.toString(),
		label: year.toString(),
	}));

	// Get unique member counts
	const uniqueMemberCounts = [
		...new Set(artists.map((a) => a.members.length)),
	].sort((a, b) => a - b);
	const memberCountOptions = uniqueMemberCounts.map((count) => ({
		value: count.toString(),
		label: count === 1 ? "1 member" : `${count} members`,
	}));

	// Get all unique locations
	const allLocations = new Set<string>();
	relations.forEach((rel) => {
		Object.keys(rel.datesLocations).forEach((loc) => {
			const formatted = loc.replace(/-/g, ", ").replace(/_/g, " ");
			allLocations.add(formatted);
		});
	});
	const uniqueLocations = Array.from(allLocations).sort();
	const locationOptions = uniqueLocations.map((loc) => ({
		value: loc,
		label: loc,
	}));

	// Apply filters
	useEffect(() => {
		let filtered = [...artists];

		// Filter by creation year
		if (filters.creationYear) {
			const year = parseInt(filters.creationYear);
			filtered = filtered.filter((a) => a.creationDate === year);
		}

		// Filter by first album year
		if (filters.firstAlbumYear) {
			const year = parseInt(filters.firstAlbumYear);
			filtered = filtered.filter((a) => {
				const albumYear = parseInt(a.firstAlbum.split("-")[2] || "0");
				return albumYear === year;
			});
		}

		// Filter by member count
		if (filters.memberCount) {
			const count = parseInt(filters.memberCount);
			filtered = filtered.filter((a) => a.members.length === count);
		}

		// Filter by location
		if (filters.location) {
			filtered = filtered.filter((a) => {
				const artistRelations = relations.find((r) => r.id === a.id);
				if (!artistRelations) return false;

				const artistLocations = Object.keys(
					artistRelations.datesLocations,
				).map((loc) => loc.replace(/-/g, ", ").replace(/_/g, " "));

				return artistLocations.some(
					(artistLoc) =>
						artistLoc
							.toLowerCase()
							.includes(filters.location.toLowerCase()) ||
						filters.location
							.toLowerCase()
							.includes(artistLoc.toLowerCase()),
				);
			});
		}

		onFilterChange(filtered);
	}, [filters, artists, relations, onFilterChange]);

	const resetFilters = () => {
		setFilters({
			creationYear: "",
			firstAlbumYear: "",
			memberCount: "",
			location: "",
		});
	};

	const hasActiveFilters =
		filters.creationYear !== "" ||
		filters.firstAlbumYear !== "" ||
		filters.memberCount !== "" ||
		filters.location !== "";

	const activeFilterCount = [
		filters.creationYear,
		filters.firstAlbumYear,
		filters.memberCount,
		filters.location,
	].filter((f) => f !== "").length;

	return (
		<div className="filters-container">
			<button
				className="filters-toggle"
				onClick={() => setShowFilters(!showFilters)}
			>
				<span className="filter-icon">🎛️</span>
				<span>Filters</span>
				{hasActiveFilters && (
					<span className="filter-count">{activeFilterCount}</span>
				)}
				<span className="toggle-arrow">{showFilters ? "▲" : "▼"}</span>
			</button>

			{showFilters && (
				<div className="filters-panel">
					<div className="filters-header">
						<h3>Filter Artists</h3>
						{hasActiveFilters && (
							<button
								className="reset-button"
								onClick={resetFilters}
							>
								<span>✕</span> Clear All
							</button>
						)}
					</div>

					<div className="filters-grid">
						<Dropdown
							label="Creation Year"
							value={filters.creationYear}
							options={creationYearOptions}
							onChange={(value) =>
								setFilters((prev) => ({
									...prev,
									creationYear: value,
								}))
							}
							placeholder="All Years"
						/>

						<Dropdown
							label="First Album Year"
							value={filters.firstAlbumYear}
							options={firstAlbumYearOptions}
							onChange={(value) =>
								setFilters((prev) => ({
									...prev,
									firstAlbumYear: value,
								}))
							}
							placeholder="All Years"
						/>

						<Dropdown
							label="Number of Members"
							value={filters.memberCount}
							options={memberCountOptions}
							onChange={(value) =>
								setFilters((prev) => ({
									...prev,
									memberCount: value,
								}))
							}
							placeholder="Any Size"
						/>

						<Dropdown
							label="Concert Location"
							value={filters.location}
							options={locationOptions}
							onChange={(value) =>
								setFilters((prev) => ({
									...prev,
									location: value,
								}))
							}
							placeholder="All Locations"
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Filters;
