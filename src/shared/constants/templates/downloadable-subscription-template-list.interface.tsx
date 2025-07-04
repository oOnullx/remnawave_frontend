import { TSubscriptionTemplateType } from '@remnawave/backend-contract'

export interface IDownloadableSubscriptionTemplate {
    author: string
    name: string
    type: TSubscriptionTemplateType
    url: string
}

export interface IDownloadableSubscriptionTemplateList {
    templates: IDownloadableSubscriptionTemplate[]
}
