import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomModal({ open, onClose, children }: CustomModalProps) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="generic-modal">
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#383838] rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw] max-h-[90vh] overflow-auto"
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white hover:text-white/80 hover:cursor-pointer"
        >
            <MdOutlineClose  className="w-7 h-8"/>
        </button>

        <div className="mt-4">{children}</div>
      </Box>
    </Modal>
  );
}