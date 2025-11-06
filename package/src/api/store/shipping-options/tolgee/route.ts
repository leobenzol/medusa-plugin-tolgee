import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { HttpTypes } from "@medusajs/framework/types"
import listShippingOptionsForCartWithTranslationsWorkflow from "../../../../workflows/shipping-options-with-translations"
import { StoreGetTolgeeShippingOptionList } from "../../../middlewares"

export const GET = async (
    req: MedusaRequest<{}, StoreGetTolgeeShippingOptionList>,
    res: MedusaResponse<HttpTypes.StoreShippingOptionListResponse>
) => {
    const workflow = listShippingOptionsForCartWithTranslationsWorkflow(req.scope)

    // Transform the validated query to match the workflow input type
    const workflowInput = {
        ...req.validatedQuery,
        fields: req.validatedQuery.fields
            ? Array.isArray(req.validatedQuery.fields)
                ? req.validatedQuery.fields
                : [req.validatedQuery.fields]
            : undefined
    }

    const { result: shipping_options } = await workflow.run({ input: workflowInput })

    res.json({ shipping_options })
}
