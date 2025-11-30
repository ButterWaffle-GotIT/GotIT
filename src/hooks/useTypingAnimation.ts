import { useState, useEffect } from "react";

/**
 * 타이핑 애니메이션 효과를 구현하는 커스텀 훅
 */
export function useTypingAnimation(
	texts: string[],
	typingSpeed: number = 100,
	deletingSpeed: number = 50,
	pauseDuration: number = 2000
): string {
	const [currentTextIndex, setCurrentTextIndex] = useState(0);
	const [currentText, setCurrentText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		if (texts.length === 0) return;

		const targetText = texts[currentTextIndex];

		const timeout = setTimeout(
			() => {
				if (!isDeleting) {
					// 타이핑 중
					if (currentText.length < targetText.length) {
						setCurrentText(targetText.slice(0, currentText.length + 1));
					} else {
						// 타이핑 완료 - 대기 후 삭제 시작
						setTimeout(() => setIsDeleting(true), pauseDuration);
					}
				} else {
					// 삭제 중
					if (currentText.length > 0) {
						setCurrentText(currentText.slice(0, -1));
					} else {
						// 삭제 완료
						setIsDeleting(false);
						setCurrentTextIndex((prev) => (prev + 1) % texts.length);
					}
				}
			},
			isDeleting ? deletingSpeed : typingSpeed
		);

		return () => clearTimeout(timeout);
	}, [
		currentText,
		isDeleting,
		currentTextIndex,
		texts,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
	]);

	return currentText;
}
