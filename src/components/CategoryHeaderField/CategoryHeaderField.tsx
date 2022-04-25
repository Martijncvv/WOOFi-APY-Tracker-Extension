import React, { useState, useEffect } from 'react'
import './CategoryHeaderField.css'

interface CategoryHeaderFieldProps {
	value_1: string
	value_2: string
	value_3: string
}

const CategoryHeaderField: React.FC<CategoryHeaderFieldProps> = ({
	value_1,
	value_2,
	value_3,
}) => {
	return (
		<div className="category-header-field-values">
			<div className="category-header-field-value ">{value_1}</div>

			<div className="category-header-field-value category-header-field-value-2 ">
				{value_2}
			</div>
			<div className="category-header-field-value category-header-field-value-3">
				{value_3}
			</div>
		</div>
	)
}

export default CategoryHeaderField
