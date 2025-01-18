import { createContext, useState, useContext, useEffect } from "react";

interface RefreshingPages {
    refreshHome: boolean;
    refreshEditUser: boolean;
    refreshCreateEvent: boolean;
    setRefreshState: (key: keyof RefreshingPages, value: boolean) => void;
}

// Criando o contexto com valores iniciais padrão
const RefreshingContext = createContext<RefreshingPages>({
    refreshHome: false,
    refreshEditUser: false,
    refreshCreateEvent: false,
    setRefreshState: () => {},
});

export const RefreshPagesProvider = ({ children }: { children: React.ReactNode }) => {
    const [refreshingPages, setRefreshingPages] = useState<RefreshingPages>({
        refreshHome: false,
        refreshEditUser: false,
        refreshCreateEvent: false,
        setRefreshState: () => {}
    });

    const setRefreshState = (key: keyof RefreshingPages, value: boolean) => {
        setRefreshingPages((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(() => {
        console.log(refreshingPages); 
    }, [refreshingPages]);

    return (
        <RefreshingContext.Provider
            value={{
                ...refreshingPages,
                setRefreshState, 
            }}
        >
            {children}
        </RefreshingContext.Provider>
    );
};

export const useRefreshPage = () => useContext(RefreshingContext);
