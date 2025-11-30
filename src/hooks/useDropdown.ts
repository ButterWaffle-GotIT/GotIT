"use client";

import { useState, useRef, useEffect, type RefObject } from "react";

interface UseDropdownReturn<T extends HTMLElement> {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
	dropdownRef: RefObject<T | null>;
}

export function useDropdown<
	T extends HTMLElement = HTMLDivElement,
>(): UseDropdownReturn<T> {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<T>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	return { isOpen, toggle, close, dropdownRef };
}
