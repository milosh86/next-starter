import { useState } from 'react';

export default function useCopy() {
    const [isCopied, setIsCopied] = useState(false);

    async function handleCopy(text: string) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // hide the message after 2 seconds
    }

    return { isCopied, handleCopy };
}
