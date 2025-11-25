import { useUserHistory } from "@/hooks/useUserHistory";
import { History } from "lucide-react";

export function UserActivity() {
    const { history } = useUserHistory();

    return (
        <>
            <History className="h-[1.2rem] w-[1.2rem]" />
            {history.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center animate-in zoom-in">
                    {history.length > 9 ? '9+' : history.length}
                </span>
            )}
        </>
    );
}
