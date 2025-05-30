import React from "react";
import { Typography } from "@mui/material";

interface CustomDeleteAlertProps {
    title?: string;
    description?: string;
    cancelAction: () => void;
    confirmAction: () => void;
}

export default function CustomDeleteAlert({ title, description, cancelAction, confirmAction }: CustomDeleteAlertProps) {
    return (
        <div>
            {title && (
                <Typography variant="h6" className="text-gray-900 dark:text-gray-100 mb-2">
                    {title}
                </Typography>
            )}

            {description && (
                <Typography variant="body1" className="text-gray-600 dark:text-gray-300 mb-4">
                    {description}
                </Typography>
            )}

            <div className="mt-8 flex justify-center space-x-2">
                <button onClick={cancelAction} className="border-1 border-red-500 hover:border-red-500/80 py-1 px-2 rounded-sm text-red-400 hover:text-red-400/80 hover:cursor-pointer">Cancelar</button>
                <button onClick={confirmAction} className="bg-green-600 hover:bg-green-600/80 py-1 px-2 rounded-sm hover:cursor-pointer">Confirmar</button>
            </div>
        </div>
    );
}
