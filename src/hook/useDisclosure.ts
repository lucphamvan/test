import { useCallback, useState } from "react";

export const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onToggle = useCallback(() => setIsOpen((v) => !v), []);
    const onClose = useCallback(() => setIsOpen(false), []);
    const onOpen = useCallback(() => setIsOpen(true), []);
    return { isOpen, onToggle, onClose, onOpen };
};
