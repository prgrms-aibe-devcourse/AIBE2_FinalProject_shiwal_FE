import type { ReactNode, MouseEvent } from "react";

type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
    if (!open) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                style={{
                    width: 560,
                    maxWidth: "90vw",
                    background: "#fff",
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: "0 8px 24px rgba(0,0,0,.2)",
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3 style={{ margin: 0 }}>{title}</h3>
                    <button onClick={onClose}>×</button>
                </div>
                {children}
            </div>
        </div>
    );
}