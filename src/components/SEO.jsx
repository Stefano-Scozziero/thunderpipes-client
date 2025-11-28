import { useEffect } from 'react';

export default function SEO({ title, description, keywords, noindex }) {
    useEffect(() => {
        // Update Title
        document.title = `${title} | ESP Performance`;

        // Update Meta Tags
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            if (description) metaDescription.setAttribute('content', description);
        } else if (description) {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description;
            document.head.appendChild(meta);
        }

        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            if (keywords) metaKeywords.setAttribute('content', keywords);
        } else if (keywords) {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = keywords;
            document.head.appendChild(meta);
        }

        const metaRobots = document.querySelector('meta[name="robots"]');
        if (metaRobots) {
            if (noindex) metaRobots.setAttribute('content', 'noindex');
            else metaRobots.removeAttribute('content'); // Or set to 'index, follow'
        } else if (noindex) {
            const meta = document.createElement('meta');
            meta.name = 'robots';
            meta.content = 'noindex';
            document.head.appendChild(meta);
        }

        // Cleanup function to reset (optional, but good practice)
        return () => {
            // We could reset to default here if needed
        };
    }, [title, description, keywords, noindex]);

    return null;
}
