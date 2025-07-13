import DataSecurity from "./privacyVisuals/DataSecurity";
import IdentityProtection from "./privacyVisuals/IdentityProtection";
import ProfessionalBoundaries from "./privacyVisuals/ProfessionalBoundaries";

export const privacyInfo = [
    {
        label: "IDENTITY PROTECTION",
        key: "identityProtection",
        heading: "Protect Your Personal Details",
        description: "Prevent identity theft and unwanted contact by hiding sensitive information like your address, phone number, and other private data until you're ready to share it with trusted employers.",
        illustration: IdentityProtection
    },
    {
        label: "DATA SECURITY",
        key: "dataSecurity",
        heading: "Your Data Stays in Your Hands",
        description: "Your resume is only stored if you're logged in and choose to save it. Until then, all processing happens locally in your browser, keeping your data private and fully under your control.",
        illustration: DataSecurity
    },
    {
        label: "PROFESSIONAL BOUNDARIES",
        key: "professionalBoundaries",
        heading: "Reveal on Your Terms",
        description: "Maintain professional boundaries by sharing only relevant work information during initial screening. Keep personal details private until you establish trust with potential employers.",
        illustration: ProfessionalBoundaries
    },
]