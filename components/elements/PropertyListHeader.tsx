import { addPerPage, addSort } from "@/features/filter/filterSlice"
import type { RootState } from "@/features/store"
import type React from "react"
import { useDispatch, useSelector } from "react-redux"

interface PropertyListHeaderProps {
	totalProperties: number
}

const PropertyListHeader: React.FC<PropertyListHeaderProps> = ({ totalProperties }) => {
	const dispatch = useDispatch()
	const { propertySort } = useSelector((state: RootState) => state.filter)

	const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const perPage = Number.parseInt(e.target.value, 10)
		dispatch(addPerPage({ start: 0, end: perPage }))
	}

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(addSort(e.target.value))
	}

	return (
		<div className="d-flex justify-content-between align-items-center mb-4">
			<p>Showing {totalProperties} properties</p>
			<div className="d-flex">
				<div className="filter-group me-3">
					<select onChange={handlePerPageChange} value={propertySort.perPage.end}>
						<option value={12}>Show: (12)</option>
						<option value={30}>Show: (30)</option>
						<option value={50}>Show: (50)</option>
					</select>
				</div>
				<div className="filter-group">
					<select onChange={handleSortChange} value={propertySort.sort}>
						<option value="">Sort by (Default)</option>
						<option value="oldest">Oldest</option>
						<option value="newest">Newest</option>
						<option value="price-asc">Price: Low to High</option>
						<option value="price-desc">Price: High to Low</option>
					</select>
				</div>
			</div>
		</div>
	)
}

export default PropertyListHeader

