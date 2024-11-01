import React from 'react';

export const Button1 = ({onClick, texte}) => (
    <button onClick={onClick} className="py-2 px-6 bg-custom-1 text-custom-4 rounded-md cursor-pointer font-semibold text-sm hover:shadow-2xl hover:scale-105 hover:duration-200">
        {texte}
    </button>
);

export const Button2 = ({onClick, texte}) => (
    <button onClick={onClick} className="py-2 px-6 bg-custom-2 text-custom-4 rounded-md cursor-pointer font-semibold text-sm hover:shadow-2xl hover:scale-105 hover:duration-200">
        {texte}
    </button>
);

export const Button5 = ({onClick, texte}) => (
    <button onClick={onClick} className="py-2 px-6 bg-custom-5 text-custom-4 rounded-md cursor-pointer font-semibold text-sm hover:shadow-2xl hover:scale-105 hover:duration-200">
        {texte}
    </button>
);