import { rules, eventInfo } from "./eventData";

export const chatQueries = [
    {
        id: "rules",
        label: "Operational Rules",
        icon: "📄",
        getResponse: () => ({
            title: "⚡ Operational Rules",
            items: rules.map((r) => `${r.icon} ${r.text}`),
        }),
    },
    {
        id: "coordinates",
        label: "Event Coordinates",
        icon: "📍",
        getResponse: () => ({
            title: "📍 Event Coordinates",
            items: [
                `🏢 Venue: ${eventInfo.venue}`,
                `⏰ Time: ${eventInfo.time}`,
            ],
        }),
    },
    {
        id: "squad",
        label: "Squad Requirements",
        icon: "👥",
        getResponse: () => ({
            title: "👥 Squad Requirements",
            items: [
                `🔢 Team Size: ${eventInfo.teamSize}`,
                "💻 A laptop is compulsory for every team.",
            ],
        }),
    },
    {
        id: "command",
        label: "Command Channel",
        icon: "📞",
        getResponse: () => ({
            title: "📞 Command Channel",
            items: eventInfo.coordinators.map(
                (c) => `👤 ${c.name} — ${c.phone}`
            ),
        }),
    },
];
