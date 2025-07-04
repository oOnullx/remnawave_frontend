import { SimpleGrid, Stack, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { MetricWithIcon } from '@widgets/dashboard/home/metric-with-icons'
import { LoadingScreen, PageHeader } from '@shared/ui'
import { MetricWithTrend } from '@shared/ui/metrics'
import { Page } from '@shared/ui/page'

import {
    getBandwidthMetrics,
    getOnlineMetrics,
    getPm2ProcessMetrics,
    getPm2SummaryMetrics,
    getSimpleMetrics,
    getUsersMetrics
} from './metrics'
import { IProps } from './interfaces'

export const HomePage = (props: IProps) => {
    const { t } = useTranslation()

    const { systemInfo, bandwidthStats, remnawaveHealth } = props

    if (!systemInfo || !bandwidthStats || !remnawaveHealth) {
        return <LoadingScreen />
    }

    const bandwidthMetrics = getBandwidthMetrics(bandwidthStats, t)
    const simpleMetrics = getSimpleMetrics(systemInfo, t)
    const usersMetrics = getUsersMetrics(systemInfo.users, t)
    const onlineMetrics = getOnlineMetrics(systemInfo.onlineStats, t)
    const pm2SummaryMetrics = getPm2SummaryMetrics(remnawaveHealth.pm2Stats, t)
    const pm2ProcessMetrics = getPm2ProcessMetrics(remnawaveHealth.pm2Stats)

    return (
        <Page title={t('constants.home')}>
            <PageHeader
                breadcrumbs={[
                    { label: t('constants.dashboard'), href: '/' },
                    { label: t('constants.overview'), href: '/' },
                    { label: t('constants.home') }
                ]}
                title={t('home.page.short-stats')}
            />

            <Stack gap="sm" mb="xl" pb="xl">
                {pm2SummaryMetrics.length > 0 && (
                    <>
                        <Text fw={600}>{t('home.page.remnawave-usage')}</Text>

                        <SimpleGrid cols={{ base: 1, sm: 2, xl: 4 }}>
                            {pm2SummaryMetrics.map((metric) => (
                                <MetricWithIcon key={metric.title} {...metric} />
                            ))}
                        </SimpleGrid>

                        <Text fw={600} mt="md">
                            {t('home.page.process-details')}
                        </Text>
                        <SimpleGrid cols={{ base: 1, sm: 2, xl: 4 }}>
                            {pm2ProcessMetrics.map((metric) => (
                                <MetricWithIcon key={metric.title} {...metric} />
                            ))}
                        </SimpleGrid>
                    </>
                )}

                <Text fw={600}>{t('home.page.bandwidth')}</Text>
                <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }}>
                    {bandwidthMetrics.map((metric) => (
                        <MetricWithTrend key={metric.title} {...metric} />
                    ))}
                </SimpleGrid>

                <Text fw={600}>{t('home.page.system')}</Text>
                <SimpleGrid cols={{ base: 1, sm: 2, xl: 3 }}>
                    {simpleMetrics.map((metric) => (
                        <MetricWithIcon key={metric.title} {...metric} />
                    ))}
                </SimpleGrid>

                <Text fw={600}>{t('home.page.online-stats')}</Text>
                <SimpleGrid cols={{ base: 1, sm: 2, xl: 4 }}>
                    {onlineMetrics.map((metric) => (
                        <MetricWithIcon key={metric.title} {...metric} />
                    ))}
                </SimpleGrid>

                <Text fw={600}>{t('user-table.widget.table-title')}</Text>
                <SimpleGrid cols={{ base: 1, sm: 2, xl: 4 }}>
                    {usersMetrics.map((metric) => (
                        <MetricWithIcon key={metric.title} {...metric} />
                    ))}
                </SimpleGrid>
            </Stack>
        </Page>
    )
}
