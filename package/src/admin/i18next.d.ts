import type enTranslation from "./i18n/translations/en.json"
import type { Resources } from "@medusajs/dashboard"

declare module "i18next" {
    interface CustomTypeOptions {
        fallbackNS: "translation"
        resources: {
            translation: Resources["translation"]
            tolgee: typeof enTranslation & Resources["translation"]
        }
    }
}
