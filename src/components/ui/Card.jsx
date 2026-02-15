import React from 'react';
import clsx from 'clsx';

const Card = ({ children, className, glass = false, hover = false, ...props }) => {
    return (
        <div
            className={clsx(
                "rounded-2xl p-6 transition-all duration-300 border border-slate-100",
                glass ? "glass" : "bg-white shadow-xl shadow-slate-200/50",
                hover && "hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-900/5 cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
