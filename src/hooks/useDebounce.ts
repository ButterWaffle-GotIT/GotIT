import { useEffect, useState } from "react";

/**
 * 값의 변경을 지연시키는 커스텀 훅
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		// delay 후에 값을 업데이트
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// 값이 변경되면 이전 타이머를 정리
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
