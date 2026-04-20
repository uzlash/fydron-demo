export type Locale = "en" | "nl";

/** Same nested shape as `en`, but string values (for localized copy). */
type StringTree<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends object
      ? StringTree<T[K]>
      : never;
};

export type TranslationDict = StringTree<typeof en>;

export const en = {
  brand: "Fydron",
  localeName: { en: "English", nl: "Dutch" },
  common: {
    termsLead: "By clicking continue, you agree to our",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    and: "and",
  },
  login: {
    title: "Log into your account",
    subtitle: "Create a password to activate your account.",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot password?",
    submit: "Create password",
    emailPlaceholder: "@email.com",
  },
  forgot: {
    title: "Forgot Password",
    subtitle: "Enter your email below to proceed.",
    email: "Email",
    hint: "If there's an account with this email address you will receive an email to change your password",
    submit: "Continue",
    emailPlaceholder: "@email.com",
  },
  mailSent: {
    title: "A mail has been sent to you email address!",
    body: "Check your inbox and tap on the link to change your password.",
  },
  createPassword: {
    title: "Create Password",
    subtitle: "Create a password to activate your account.",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    placeholder: "Placeholder text",
    requirementsTitle: "Minimum requirements",
    req1: "At least 12 characters",
    req2: "At least 1 uppercase letter, 1 lowercase letter",
    req3: "At least 1 number",
    req4: "At least 1 special character (!@#$%^&* etc.)",
    submit: "Create password",
  },
  passwordSuccess: {
    title: "Password successfully created!",
    body: "You have successfully created a new password. Continue to set up multi-factor authentication to secure your account.",
    continueCta: "Continue",
  },
  profile: {
    title: "Complete profile registration",
    subtitle: "Please enter your personal details.",
    uploadPhoto: "Upload Photo",
    removePhoto: "Remove Photo",
    photoHint: "Must be a .jpg or .png file",
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone number (optional)",
    continue: "Continue",
  },
  mfa: {
    title: "Secure your account",
    subtitle: "Set up multi-factor authentication to protect your account.",
    scanHint: "Scan with Google or Microsoft Authenticator",
    continue: "Continue",
  },
  dashboard: {
    title: "Dashboard",
    searchPlaceholder: "Search",
    notifications: "Notifications",
    greetingTitle: "Hey {name}!",
    greetingSubtitle: "Welcome back. What are we doing today?",
    loading: "Loading dashboard…",
    stats: {
      activeDossiers: "Active Dossiers",
      unreadMessages: "Unread messages",
      upcomingDeadlines: "Upcoming Deadlines",
    },
    sections: {
      platform: "Platform",
      payments: "Payments",
      other: "Other",
    },
    nav: {
      dashboard: "Dashboard",
      matrix: "The Matrix",
      globalMessages: "Global Messages",
      clientPortfolio: "Client Portfolio",
      partnerAssets: "Partner Assets",
      billingSubscription: "Billing & Subscription",
      hrVault: "HR Vault",
      insights: "Insights",
    },
    profile: {
      name: "Mary Jane",
      email: "maryja1@company.com",
    },
    dossiers: {
      title: "Dossiers",
      searchPlaceholder: "Search dossiers by organisation",
      filterByRole: "Filter by Role",
      organization: "Organisation",
      dossier: "Dossier",
      roles: "Roles",
      progress: "Progress",
    },
    pagination: {
      previous: "Previous",
      next: "Next",
    },
    empty: {
      title: "Let's Get Started!",
      subtitle:
        "Begin by adding your first client, then create and manage audits efficiently from this dashboard.",
      cta: "Add your first Client",
    },
    notificationCenter: {
      title: "Notification Center",
      markAllAsRead: "Mark all as read",
      tabs: {
        all: "All activity",
        unread: "Unread",
        mentions: "Mentions",
      },
      empty: {
        generic: "No notifications yet.",
        unread: "You have no unread notifications.",
      },
    },
  },
  billing: {
    title: "Billing & Subscriptions",
    loading: "Loading billing data…",
    overview: {
      title: "Subscription Overview Card",
      subtitle: "Manage your subscription and track your active dossier usage",
      contactCta: "Contact Fydron",
      activeClients: "Active Clients",
      activeDossiers: "Active Dossiers",
    },
    invoices: {
      title: "Invoice History",
      subtitle: "Below is a record of all invoices issued for your subscription.",
      statusLabels: {
        success: "Success",
        failed: "Failed",
        pending: "Pending",
      },
      columns: {
        invoice: "Invoice",
        status: "Status",
        date: "Date",
        amount: "Amount",
      },
      download: "Download",
      empty: "No Invoice yet",
    },
  },
  toast: {
    loginErrorTitle: "Wrong Email/Password",
    loginErrorBody:
      "It looks like you may have entered incorrect/valid credentials. Please try again",
    passwordMismatchTitle: "Wrong Password",
    passwordMismatchBody: "Passwords do not match. Please try again later.",
  },
  demo: {
    hubTitle: "Auth demo routes",
    loginErrorLink: "Open login (error state)",
    passwordSuccessDark: "Password success (dark background)",
    profileFilled: "Profile (filled)",
    profileEmpty: "Profile (upload)",
    createPasswordLoading: "Create password (loading demo)",
  },
} as const;

export const nl: TranslationDict = {
  brand: "Fydron",
  localeName: { en: "English", nl: "Dutch" },
  common: {
    termsLead: "Door op doorgaan te klikken, ga je akkoord met onze",
    terms: "Servicevoorwaarden",
    privacy: "Privacybeleid",
    and: "en",
  },
  login: {
    title: "Log in op je account",
    subtitle: "Maak een wachtwoord om je account te activeren.",
    email: "E-mail",
    password: "Wachtwoord",
    forgotPassword: "Wachtwoord vergeten?",
    submit: "Wachtwoord aanmaken",
    emailPlaceholder: "@email.com",
  },
  forgot: {
    title: "Wachtwoord vergeten",
    subtitle: "Voer hieronder je e-mailadres in om verder te gaan.",
    email: "E-mail",
    hint: "Als er een account met dit e-mailadres bestaat, ontvang je een e-mail om je wachtwoord te wijzigen",
    submit: "Doorgaan",
    emailPlaceholder: "@email.com",
  },
  mailSent: {
    title: "Er is een e-mail naar je e-mailadres verzonden!",
    body: "Controleer je inbox en tik op de link om je wachtwoord te wijzigen.",
  },
  createPassword: {
    title: "Wachtwoord aanmaken",
    subtitle: "Maak een wachtwoord om je account te activeren.",
    newPassword: "Nieuw wachtwoord",
    confirmPassword: "Bevestig wachtwoord",
    placeholder: "Plaatsvervangende tekst",
    requirementsTitle: "Minimumvereisten",
    req1: "Minstens 12 tekens",
    req2: "Minstens 1 hoofdletter en 1 kleine letter",
    req3: "Minstens 1 cijfer",
    req4: "Minstens 1 speciaal teken (!@#$%^&* enz.)",
    submit: "Wachtwoord aanmaken",
  },
  passwordSuccess: {
    title: "Wachtwoord succesvol aangemaakt!",
    body: "Je hebt succesvol een nieuw wachtwoord aangemaakt. Ga verder om multifactorauthenticatie in te stellen en je account te beveiligen.",
    continueCta: "Doorgaan",
  },
  profile: {
    title: "Profielregistratie voltooien",
    subtitle: "Voer je persoonlijke gegevens in.",
    uploadPhoto: "Foto uploaden",
    removePhoto: "Foto verwijderen",
    photoHint: "Moet een .jpg- of .png-bestand zijn",
    firstName: "Voornaam",
    lastName: "Achternaam",
    phone: "Telefoonnummer (optioneel)",
    continue: "Doorgaan",
  },
  mfa: {
    title: "Beveilig je account",
    subtitle: "Stel multifactorauthenticatie in om je account te beschermen.",
    scanHint: "Scan met Google of Microsoft Authenticator",
    continue: "Doorgaan",
  },
  dashboard: {
    title: "Dashboard",
    searchPlaceholder: "Zoeken",
    notifications: "Meldingen",
    greetingTitle: "Hey {name}!",
    greetingSubtitle: "Welkom terug. Wat gaan we vandaag doen?",
    loading: "Dashboard wordt geladen…",
    stats: {
      activeDossiers: "Actieve dossiers",
      unreadMessages: "Ongelezen berichten",
      upcomingDeadlines: "Aankomende deadlines",
    },
    sections: {
      platform: "Platform",
      payments: "Betalingen",
      other: "Overig",
    },
    nav: {
      dashboard: "Dashboard",
      matrix: "De Matrix",
      globalMessages: "Wereldwijde berichten",
      clientPortfolio: "Clientportefeuille",
      partnerAssets: "Partnerassets",
      billingSubscription: "Facturatie & Abonnement",
      hrVault: "HR kluis",
      insights: "Inzichten",
    },
    profile: {
      name: "Mary Jane",
      email: "maryja1@company.com",
    },
    dossiers: {
      title: "Dossiers",
      searchPlaceholder: "Zoek dossiers op organisatie",
      filterByRole: "Filter op rol",
      organization: "Organisatie",
      dossier: "Dossier",
      roles: "Rollen",
      progress: "Voortgang",
    },
    pagination: {
      previous: "Vorige",
      next: "Volgende",
    },
    empty: {
      title: "Laten we beginnen!",
      subtitle:
        "Begin met het toevoegen van je eerste klant en beheer daarna audits efficient vanuit dit dashboard.",
      cta: "Voeg je eerste klant toe",
    },
    notificationCenter: {
      title: "Meldingscentrum",
      markAllAsRead: "Alles markeren als gelezen",
      tabs: {
        all: "Alle activiteit",
        unread: "Ongelezen",
        mentions: "Vermeldingen",
      },
      empty: {
        generic: "Nog geen meldingen.",
        unread: "Je hebt geen ongelezen meldingen.",
      },
    },
  },
  billing: {
    title: "Facturatie & Abonnementen",
    loading: "Facturatiegegevens worden geladen…",
    overview: {
      title: "Overzichtskaart abonnement",
      subtitle: "Beheer je abonnement en volg het gebruik van je actieve dossiers",
      contactCta: "Contacteer Fydron",
      activeClients: "Actieve klanten",
      activeDossiers: "Actieve dossiers",
    },
    invoices: {
      title: "Factuurgeschiedenis",
      subtitle: "Hieronder vind je een overzicht van alle facturen voor je abonnement.",
      statusLabels: {
        success: "Succes",
        failed: "Mislukt",
        pending: "In behandeling",
      },
      columns: {
        invoice: "Factuur",
        status: "Status",
        date: "Datum",
        amount: "Bedrag",
      },
      download: "Download",
      empty: "Nog geen factuur",
    },
  },
  toast: {
    loginErrorTitle: "Verkeerde e-mail/wachtwoord",
    loginErrorBody:
      "Het lijkt erop dat je onjuiste of ongeldige gegevens hebt ingevoerd. Probeer het opnieuw",
    passwordMismatchTitle: "Verkeerd wachtwoord",
    passwordMismatchBody: "Wachtwoorden komen niet overeen. Probeer het later opnieuw.",
  },
  demo: {
    hubTitle: "Auth demo routes",
    loginErrorLink: "Login (foutstatus)",
    passwordSuccessDark: "Wachtwoord succes (donkere achtergrond)",
    profileFilled: "Profiel (ingevuld)",
    profileEmpty: "Profiel (upload)",
    createPasswordLoading: "Wachtwoord aanmaken (laad-demo)",
  },
};

export const dictionaries: Record<Locale, TranslationDict> = { en, nl };
