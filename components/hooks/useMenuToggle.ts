import { useState, useCallback } from "react";

interface MenuItem {
    id: string;
    isActive: boolean;
    hasDropdown: boolean;
}

export const useMenuToggle = () => {
    const [menuItems, setMenuItems] = useState<Record<string, MenuItem>>({});

    const handleMenuToggle = useCallback((id: string) => {
        setMenuItems((prevItems) => {
            const currentItem = prevItems[id];

            if (!currentItem) {
                return {
                    ...prevItems,
                    [id]: {
                        id,
                        isActive: true,
                        hasDropdown: true,
                    },
                };
            }

            return {
                ...prevItems,
                [id]: {
                    ...currentItem,
                    isActive: !currentItem.isActive,
                },
            };
        });
    }, []);

    const isMenuActive = useCallback(
        (id: string) => {
            return menuItems[id]?.isActive ?? false;
        },
        [menuItems]
    );

    return {
        handleMenuToggle,
        isMenuActive,
    };
};
