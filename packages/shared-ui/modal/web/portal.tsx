import { type ReactNode } from "react";

/**
 * Заглушка для React Native
 * Вместо создания DOM-портала — просто возвращает детей
 */
export default function PortalModal({ children }: { children: ReactNode }) {
	return children;
}
